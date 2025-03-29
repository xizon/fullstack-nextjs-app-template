import React, { useState, useRef, useEffect } from 'react';
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

const createStreamUrl = async (url, onProgress, onSpeedUpdate) => {
    try {
        const response: any = await fetch(url, {
            headers: {
                Range: 'bytes=0-'
            }
        });
        if (!response.ok) throw new Error('Network response was not ok');

        const contentLength = +response.headers.get('Custom-Video-Size');  // DO NOT USE "Content-Length" from cloud server
        let receivedLength = 0;
        const chunks: any[] = [];
        let lastTime = Date.now();
        let lastReceivedLength = 0;
        const chunkSize = 1024 * 1024; // 1MB per chunk

        // Initial read
        const reader = response.body?.getReader();
        if (!reader) throw new Error('No reader available');

        // Fetch the video in chunks
        while (receivedLength < contentLength) {
            const rangeStart = receivedLength;
            const rangeEnd = Math.min(receivedLength + chunkSize - 1, contentLength - 1);
            const range = `bytes=${rangeStart}-${rangeEnd}`;

            const chunkResponse = await fetch(url, {
                headers: { Range: range }
            });
            const chunkReader = chunkResponse.body?.getReader();

            if (chunkReader) {
                let done = false;
                while (!done) {
                    const { done: chunkDone, value } = await chunkReader.read();
                    done = chunkDone;
                    if (value) {
                        chunks.push(value);
                        receivedLength += value.length;

                        // Progress update
                        if (onProgress && contentLength) {
                            const progress = (receivedLength / contentLength) * 100;
                            onProgress(progress);
                        }

                        // Speed update
                        const currentTime = Date.now();
                        const timeDiff = (currentTime - lastTime) / 1000; // seconds
                        if (timeDiff >= 1) {
                            const speed = (receivedLength - lastReceivedLength) / timeDiff; // bytes per second
                            onSpeedUpdate(speed);
                            lastTime = currentTime;
                            lastReceivedLength = receivedLength;
                        }
                    }
                }
            }
        }

        // Combine all chunks into a single blob
        const blob = new Blob(chunks, { type: 'video/mp4' });
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error('Error creating stream URL:', error);
        throw error;
    }
};

const revokeStreamUrl = (url) => {
    if (url) {
        URL.revokeObjectURL(url);
    }
}; 

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, id, poster }) => {
    const isMp4 = url && url.toLowerCase().endsWith('.mp4');
    const urlObj = new URL(url);
    const filePath = urlObj.pathname;
    const reqUrl = `${apiUrls.VIDEO_URL}?filePath=${encodeURIComponent(filePath)}&id=${id}`;
    
    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoUrl, setVideoUrl] = useState<string>('');
    const [loadingProgress, setLoadingProgress] = useState<number>(0);
    const [downloadSpeed, setDownloadSpeed] = useState<number>(0);
    const abortControllerRef = useRef<AbortController | null>(null);
    
    useEffect(() => {
        const loadVideo = async () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            abortControllerRef.current = new AbortController();

            try {
                const url = await createStreamUrl(
                    reqUrl, 
                    (progress) => setLoadingProgress(progress), 
                    (speed) => setDownloadSpeed(speed)
                );
                setVideoUrl(url);
            } catch (error: any) {
                if (error.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    console.error('Error loading video:', error.message);
                }
            }
        };

        loadVideo();

        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            if (videoUrl) {
                revokeStreamUrl(videoUrl);
            }
        };
    }, []);

    return (
        <>
            {isMp4 && (
                <div className="relative">
                    {loadingProgress < 100 ? (
                        <div className="text-center">
                            <small>(Video) Loading... {loadingProgress.toFixed(2)}%, Speed:{formatSpeed(downloadSpeed)} </small>
                            <div className="absolute bottom-0 left-0 right-0 bg-primary" style={{ height: '5px', width: `${loadingProgress}%` }}>
                            </div>
                        </div>
                        
                    ) : (
                        <div className="app-ratio app-ratio-16x9">
                            <video
                                ref={videoRef}
                                src={videoUrl}
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="auto"
                                poster={poster}
                            ></video>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default VideoPlayer;