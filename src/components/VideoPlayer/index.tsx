import React, { useRef, useEffect, useState } from 'react';
import Hls from 'hls.js';  // @types/hls.js
import apiUrls from '@/config/apiUrls';

interface VideoPlayerProps {
    url: string;
    id: number;
    poster?: string;
}

const formatSpeed = (bytesPerSecond: number): string => {
    if (bytesPerSecond >= 1024 * 1024) {
        return `${(bytesPerSecond / (1024 * 1024)).toFixed(2)} MB/s`;
    } else if (bytesPerSecond >= 1024) {
        return `${(bytesPerSecond / 1024).toFixed(2)} KB/s`;
    }
    return `${bytesPerSecond.toFixed(2)} B/s`;
};


const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, id, poster }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const [totalSize, setTotalSize] = useState<number>(0);
    const [downloadSpeed, setDownloadSpeed] = useState<number>(0);

    // speed
    const lastTime = useRef<number>(0);
    const lastReceivedLength = useRef<number>(0);


    // Create Stream Cache
    const urlObj = new URL(url);
    const filePath = urlObj.pathname;
    const reqUrl = `${apiUrls.VIDEO_URL}?filePath=${encodeURIComponent(filePath)}&id=${id}`;

    // Add a ref to track accumulated size
    const accumulatedSizeRef = useRef<number>(0);

    // Add new ref for tracking segments
    const segmentsRef = useRef<Set<string>>(new Set());

    const fetchM3U8 = async (url: string) => {
        try {
            const response = await fetch(url);
            const text = await response.text();
            // console.log("M3U8 Content:", text);

            // Get the total size information from the m3u8 file
            const totalSizeMatch = text.match(/#EXT-X-TOTAL-SIZE:(\d+)/);
            if (totalSizeMatch) {
                setTotalSize(parseInt(totalSizeMatch[1]));
            }
        } catch (error) {
            console.error("Failed to fetch M3U8:", error);
        }
    };



    useEffect(() => {
        // Create Stream Cache
        fetch(reqUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const _totalSize = data.data.totalSize;  // DO NOT USE "Content-Length" from cloud server;
            setTotalSize(_totalSize);

            const setupHls = async () => {
                if (!videoRef.current) return;

                try {
                    const hlsUrl = `${apiUrls.HLS_VIDEO_URL.replace('{id}', id as never).replace('{slug}', 'playlist.m3u8')}`;

                    // Check for native HLS support first (Safari)
                    if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
                        console.log('--> Using native HLS support');
                        videoRef.current.src = hlsUrl;

                        // Modified progress tracking for Safari
                        const trackProgressSafari = async () => {
                            try {
                                // First fetch the m3u8 playlist
                                const playlistResponse = await fetch(hlsUrl);
                                const playlist = await playlistResponse.text();
                                
                                // Parse the playlist to get ts segments
                                const tsSegments = playlist.split('\n')
                                    .filter(line => line.endsWith('.ts'))
                                    .map(segment => segment.trim());

                                // Track each segment
                                for (const segment of tsSegments) {
                                    if (!segmentsRef.current.has(segment)) {
                                        const segmentUrl = `${apiUrls.HLS_VIDEO_URL.replace('{id}', id as never).replace('{slug}', segment)}`;
                                        
                                        const xhr = new XMLHttpRequest();
                                        xhr.open('GET', segmentUrl, true);
                                        
                                        xhr.onprogress = (event) => {
                                            if (!segmentsRef.current.has(segment)) {
                                                accumulatedSizeRef.current += event.loaded;

                                                // Speed update
                                                const currentTime = Date.now();
                                                const timeDiff = (currentTime - lastTime.current) / 1000;
                                                if (timeDiff >= 1) {
                                                    const speed = (accumulatedSizeRef.current - lastReceivedLength.current) / timeDiff;
                                                    setDownloadSpeed(speed);
                                                    lastTime.current = currentTime;
                                                    lastReceivedLength.current = accumulatedSizeRef.current;
                                                }

                                                // Progress update
                                                if (_totalSize > 0) {
                                                    const newProgress = (accumulatedSizeRef.current / _totalSize) * 100;
                                                    setProgress(Math.min(newProgress, 100));
                                                }
                                            }
                                        };

                                        xhr.onload = () => {
                                            segmentsRef.current.add(segment);
                                        };

                                        xhr.send();
                                    }
                                }

                                // Continue tracking if not all segments are loaded
                                if (accumulatedSizeRef.current < _totalSize) {
                                    setTimeout(trackProgressSafari, 1000);
                                }
                            } catch (error) {
                                console.error('Error tracking progress:', error);
                            }
                        };

                        // Start tracking progress
                        trackProgressSafari();

                        videoRef.current.addEventListener('loadedmetadata', () => {
                            setIsLoading(false);
                            videoRef.current?.play().catch(console.error);
                        });

                    } else if (Hls.isSupported()) {

                        if (hlsRef.current) {
                            hlsRef.current.destroy();
                        }

                        const hls = new Hls({
                            enableWorker: true,
                            lowLatencyMode: true,
                            backBufferLength: 90,
                            xhrSetup: (xhr, url) => {
                                // Listen to the download progress

                                xhr.addEventListener('progress', (event) => {
                                    // Update accumulated size for this segment
                                    accumulatedSizeRef.current += event.loaded;


                                    // Speed update
                                    const currentTime = Date.now();
                                    const timeDiff = (currentTime - lastTime.current) / 1000; // seconds
                                    if (timeDiff >= 1) {
                                        const speed = (accumulatedSizeRef.current - lastReceivedLength.current) / timeDiff; // bytes per second
                                        setDownloadSpeed(speed);
                                        lastTime.current = currentTime;
                                        lastReceivedLength.current = accumulatedSizeRef.current;
                                    }


                                    // Progress update
                                    if (_totalSize > 0) {
                                        const newProgress = (accumulatedSizeRef.current / _totalSize) * 100;
                                        setProgress(Math.min(newProgress, 100));
                                    }
                                });

                                // Rewrite URLs to use our API endpoints
                                if (url.includes('.m3u8')) {
                                    xhr.open('GET', `${apiUrls.HLS_VIDEO_URL.replace('{id}', id as never).replace('{slug}', 'playlist.m3u8')}`, true);
                                } else if (url.includes('.key')) {
                                    xhr.open('GET', `${apiUrls.HLS_VIDEO_URL.replace('{id}', id as never).replace('{slug}', 'enc.key')}`, true);
                                } else if (url.includes('.ts')) {
                                    const segmentName = url.split('/').pop();
                                    if (segmentName) {
                                        xhr.open('GET', `${apiUrls.HLS_VIDEO_URL.replace('{id}', id as never).replace('{slug}', segmentName)}`, true);
                                    }
                                }
                            }
                        });


                        hlsRef.current = hls;

                        // Attach media and load source
                        hls.attachMedia(videoRef.current);

                        hls.on(Hls.Events.MEDIA_ATTACHED, () => {
                            console.log('--> HLS Media attached');
                            hls.loadSource(hlsUrl);
                        });

                        hls.on(Hls.Events.MANIFEST_PARSED, (event, data: any) => {
                            console.log('--> HLS Manifest parsed');
                            setIsLoading(false);
                            videoRef.current?.play().catch(console.error);

                            // Scrape M3U8 file content directly
                            // if (hls.url) {
                            //     fetchM3U8(hls.url);
                            // }

                        });

                        hls.on(Hls.Events.FRAG_LOADED, (event, data: any) => {
                            // Fragment loaded event handling is now optional
                            // since we're tracking progress in xhr progress event
                        });

                        hls.on(Hls.Events.ERROR, (event, data) => {
                            console.error('HLS Error:', data);
                            if (data.fatal) {
                                switch (data.type) {
                                    case Hls.ErrorTypes.NETWORK_ERROR:
                                        console.log('Fatal network error encountered');
                                        hls.startLoad();
                                        break;
                                    case Hls.ErrorTypes.MEDIA_ERROR:
                                        console.log('Fatal media error encountered');
                                        hls.recoverMediaError();
                                        break;
                                    default:
                                        hls.destroy();
                                        setError('Fatal HLS error');
                                        break;
                                }
                            }
                        });

                    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
                        videoRef.current.src = hlsUrl;
                        videoRef.current.addEventListener('loadedmetadata', () => {
                            setIsLoading(false);
                            videoRef.current?.play().catch(console.error);
                        });
                    } else {
                        setError('HLS is not supported in this browser');
                    }
                } catch (err) {
                    console.error('Error setting up HLS:', err);
                    setError('Failed to load video');
                }
            };

            setupHls();

        });

        return () => {

            // Clear segments set on cleanup
            segmentsRef.current.clear();

            if (hlsRef.current) {
                hlsRef.current.destroy();
                hlsRef.current = null;
            }
        };

    }, [url, id]);


    return (

        <div className="relative">
      
            {progress < 100 ? (
                <div className="text-center">
                    <small>(Video) Loading... {progress.toFixed(2)}%, Speed:{formatSpeed(downloadSpeed)} </small>
                    <div className="absolute bottom-0 left-0 right-0 bg-primary" style={{ height: '5px', width: `${progress}%` }}>
                    </div>
                </div>

            ) : null}

            <div className="app-ratio app-ratio-16x9" style={{display: progress < 100 ? 'none' : ''}}>
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster={poster}
                ></video>
            </div>


        </div>
    );
};

export default VideoPlayer;