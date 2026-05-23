
"use client"

import { useEffect, useState } from 'react'
import { AdMob, BannerAdPosition, BannerAdSize, BannerAdOptions } from '@capacitor-community/admob'
import { Capacitor } from '@capacitor/core'
import { logger } from '@/hooks/use-debug-logs'

export function BannerAd() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (!Capacitor.isNativePlatform()) return

        const showBanner = async () => {
            try {
                // Your specific Ad Unit ID
                const adUnitId = "ca-app-pub-9369472846382804/6274136018"
                
                const options: BannerAdOptions = {
                    adId: adUnitId,
                    position: BannerAdPosition.BOTTOM_CENTER,
                    size: BannerAdSize.ADAPTIVE_BANNER,
                    isTesting: false,
                    margin: 0
                }
                
                await AdMob.showBanner(options)
                setIsVisible(true)
                logger.add('AdMob: Banner Ad Active', 'success')
            } catch (e: any) {
                logger.add(`AdMob Banner Error: ${e.message}`, 'warn')
            }
        }

        showBanner()

        return () => {
            if (Capacitor.isNativePlatform()) {
                AdMob.removeBanner()
            }
        }
    }, [])

    if (!isVisible && Capacitor.isNativePlatform()) return null

    return !Capacitor.isNativePlatform() ? (
        <div className="w-full h-12 bg-card/50 border-t border-white/5 flex items-center justify-center">
            <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">
                AdMob Native Banner Active
            </p>
        </div>
    ) : null
}
