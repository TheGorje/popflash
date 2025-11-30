import {
  InstagramEmbed,
  TikTokEmbed,
  XEmbed,
  YouTubeEmbed
} from "react-social-media-embed"
import { styled, useTheme } from "styled-components"

interface SocialVideoProps {
  url: string;
  isValidUrl?: (arg: boolean) => void
}

export function SocialVideo({ url, isValidUrl }: SocialVideoProps) {
  const { space } = useTheme()
  const baseStyle = {
    borderRadius: space.sm,
    overflow: "auto",
    // maxWidth: 500,
    margin: "auto",
  } as const

  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    if (isValidUrl) isValidUrl(true)
    return (

      url.includes("/shorts/") ? (
        <YoutubeShortWrapper>
          <YouTubeEmbed url={url} />
        </YoutubeShortWrapper >
      ) : (
        <YouTubeEmbed url={url} style={baseStyle} />
      )
    )
  }

  if (url.includes("tiktok.com")) {
    if (isValidUrl) isValidUrl(true)
    return <TikTokEmbed url={url} width={324} height={572} style={baseStyle} />
  }

  if (url.includes("twitter.com") || url.includes("x.com")) {
    if (isValidUrl) isValidUrl(true)
    return (
      <XEmbed
        style={baseStyle}
        url={url}
      />
    )
  }

  if (url.includes("facebook.com")) {
    if (isValidUrl) isValidUrl(true)
    return <FacebookPreview url={url} />
  }

  if (url.includes("instagram.com")) {
    if (isValidUrl) isValidUrl(true)
    return <InstagramEmbed url={url} />
  }

  if (isValidUrl) isValidUrl(false)
  return <p>Source not supported.</p>
}

function FacebookPreview({ url }: { url: string }) {
  const { colors, space } = useTheme()

  return (
    <div
      onClick={() => window.open(url, "_blank")}
      style={{
        width: '100%',
        height: 280,
        background: colors["surface-a20"],
        borderRadius: space.xs,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: colors.white,
      }}
    >
      <p>🎬 Watch on Facebook</p>
    </div>
  )
}

const YoutubeShortWrapper = styled.div`
  width: 100%;
  aspect-ratio: 9 / 16;
  border-radius: 12px;
  overflow: hidden;
  background: black;

  .youtube-iframe iframe {
    width: 100% !important;
    height: 100% !important;
    aspect-ratio: 9 / 16;
  }

`