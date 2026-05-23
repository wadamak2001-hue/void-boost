"use client"

import { useEffect, useState } from 'react'
import { AdMob, BannerAdPosition, BannerAdSize } from '@capacitor-community/admob'
import { Capacitor } from '@capacitor/core'
import { logger } from '@/hooks/use-debug-logs'

export function BannerAd() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (!Capacitor.isNativePlatform()) return

        const showBanner = async () => {
            try {
                const adId = localStorage.getItem('void_boost_ad_unit_id') || "ca-app-pub-9369472846382804/6274136018"
                await AdMob.showBanner({
                    adId: adId,
                    position: BannerAdPosition.BOTTOM_CENTER,
                    size: BannerAdSize.ADAPTIVE_BANNER,
                    isTesting: false,
                    margin: 0
                })
                setIsVisible(true)
                logger.add('AdMob: Banner Ad Displayed', 'success')
            } catch (e) {
                logger.add('AdMob: Banner failed to load', 'warn')
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

    // Placeholder for web view/development
    return !Capacitor.isNativePlatform() ? (
        <div className="w-full h-12 bg-card/50 border-t border-white/5 flex items-center justify-center">
            <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">
                AdMob Native Banner Placeholder
            </p>
        </div>
    ) : null
}
