'use client'

/*
 *************************************
 * <!-- Header -->
 *************************************
 */
import Link from 'next/link';
import Image from 'next/image';
import appData from "@/data/app.json";
import { useTheme } from '@/contexts/ThemeContext';

export default function Header(props) {
    const { theme, setTheme } = useTheme();

    return (
        <>

            <header>
                <div className="container">
                    <div className="brand">
                        <Link href="/"><span><Image width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} src="/assets/images/logo.png" alt={''} /></span>{`${appData.siteName}`}</Link>
                    </div>
                    <nav className="menu">
                        {props.menu}
                    </nav>
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '1.2rem',
                            padding: '0.25em 0.5em',
                            color: 'inherit',
                        }}
                    >
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                </div>
            </header>

        </>
    )
}
