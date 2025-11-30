import type { GrenadeFormData } from '@src/@types/create-trick'
import type { GrenadesType } from '@src/@types/data'
import type { MapsOptions } from '@src/@types/map'
import { GrenadesComponent } from '@src/components/grenades'
import { MapIconComponent } from '@src/components/maps-icons'
import { SelectMenu } from '@src/components/select-menu'
import { SocialVideo } from '@src/components/video-player'
import { TextTitleLg, TextTitleMd } from '@src/styles/typography'
import { useState } from 'react'
import { useTheme } from 'styled-components'

import { StepButton } from '../step-button'
import { InputVideo, Selection, VideoWrapper, Wrapper } from './styles'

interface StepVideoProps {
  data: GrenadeFormData
  onUpdate: (data: Partial<GrenadeFormData>) => void
  onNext: () => void
}

export function StepVideo({ data, onUpdate, onNext }: StepVideoProps) {
  const { space } = useTheme()
  const [map, setMap] = useState(data.map || '')

  const [trickType, setTrickType] = useState<GrenadesType>(data.type || "smoke")
  const [videoUrl, setVideoUrl] = useState<string>(data?.video || '')
  const [isValidUrl, setIsValidUrl] = useState(false)


  const maps = [
    { label: "Mirage", value: "mirage" as MapsOptions, image: <MapIconComponent map="mirage" /> },
    { label: "Dust 2", value: "dust2" as MapsOptions, image: <MapIconComponent map="dust2" /> },
    { label: "Inferno", value: "inferno" as MapsOptions, image: <MapIconComponent map="inferno" /> },
    { label: "Overpass", value: "overpass" as MapsOptions, image: <MapIconComponent map="overpass" /> },
    { label: "Nuke", value: "nuke" as MapsOptions, image: <MapIconComponent map="nuke" /> },
    { label: "Train", value: "train" as MapsOptions, image: <MapIconComponent map="train" /> },
    { label: "Vertigo", value: "vertigo" as MapsOptions, image: <MapIconComponent map="vertigo" /> },
    { label: "Cache", value: "cache" as MapsOptions, image: <MapIconComponent map="cache" /> },
    { label: "Ancient", value: "ancient" as MapsOptions, image: <MapIconComponent map="ancient" /> },
    { label: "Anubis", value: "anubis" as MapsOptions, image: <MapIconComponent map="anubis" /> },
  ]

  const trickTypes = [
    { label: "Smoke", value: "smoke", image: <GrenadesComponent type='smoke' size={11} /> },
    { label: "Molotov", value: "molotov", image: <GrenadesComponent type='molotov' size={8} /> },
    { label: "HE", value: "HE", image: <GrenadesComponent type='HE' size={15} /> },
    { label: "Flashbang", value: "flashbang", image: <GrenadesComponent type='flashbang' size={15} /> },
  ]

  const handleNextStep = () => {
    onUpdate({ map: map, type: trickType, video: videoUrl })
    onNext()
  }

  return (
    <Wrapper>
      <Selection>
        <SelectMenu
          label='Map'
          options={maps}
          value={map}
          onChange={(value) => setMap(value as typeof map)}
          placeholder="Select a map"
        />
        <SelectMenu
          label='Trick Type'
          options={trickTypes}
          value={trickType as GrenadesType}
          onChange={(opt) => setTrickType(opt as GrenadesType)}
          placeholder="Select a trick"
        />
      </Selection>

      <VideoWrapper>
        <div style={{ gap: space.xs, display: 'grid' }}>
          <TextTitleLg>Video Url</TextTitleLg>

          <InputVideo
            placeholder='URL from (YouTube, TikTok, instagram, or X/Twitter)'
            onChange={(e) => setVideoUrl(e.target.value)}
            value={videoUrl}
            $isFilled={videoUrl.length >= 1}
          />
        </div>

        {videoUrl.length >= 1 &&
          <div style={{ gap: space.xs, display: 'grid' }}>
            <TextTitleMd>Preview</TextTitleMd>
            <SocialVideo url={videoUrl} isValidUrl={setIsValidUrl} />
          </div >
        }
      </VideoWrapper >

      {isValidUrl && trickType.length >= 1 && map.length >= 1 &&
        <div style={{ gap: space.xs, display: 'flex' }}>
          <StepButton
            onClick={handleNextStep}
            stepType='next'
          >
            Next
          </StepButton>
        </div>
      }
    </Wrapper >
  )
}
