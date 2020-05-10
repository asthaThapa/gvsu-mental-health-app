import React from 'react'
import { classNames } from '../../utils/system'
import VideoPlayer from '../video_player'
import { IonImg } from '@ionic/react'
import anxiety from '../../assets/Anxiety.png'
import depression from '../../assets/Depression.png'
import suicide from '../../assets/Suicide.png'
import psychosis from '../../assets/psychosis.png'

import './index.scss'

export interface TextBlockProps {
    input: string
}

export default class TextBlock extends React.Component<TextBlockProps> {

    public render() {
        const sections = []
        const curr = this.props.input
        let index = 0
        for (let i = 0; i < curr.length; i++) {
            if (curr[i] === '\n') {
                sections.push(curr.substr(index, (i - index)))
                index = i + 1
            }
        }

        if (sections.length === 0) {
            sections.push(curr)
        }
        else {
            sections.push(curr.substr(index))
        }

        return sections.map((sec, idx) => {
            let tabbed = false
            let link = null
            let linkDest = null
            let vidLink = null
            let video = null
            let number = null
            let destNum = null
            let picture = null

            if (sec[0] === '-') {
                tabbed = true
            }

            if (sec.includes("[picture")) {
                const picLink = sec.substr(sec.indexOf('[') + 8, sec.indexOf(']') - (sec.indexOf('[') + 8))
                const pic = this.selectPicture(picLink)
                console.log(pic)
                picture = (
                    <IonImg className="resource-tile__image" src={pic} />
                )
            }

            if (sec.includes("[link")) {
                linkDest = sec.substr(sec.indexOf('[') + 5, sec.indexOf(']') - (sec.indexOf('[') + 5))
                let linkText = linkDest.substr(13)
                if (linkDest.includes('placeholder: ')) {
                    linkText = linkDest.substr(linkDest.indexOf('placeholder: ') + 13)
                    linkDest = linkDest.substr(0, linkDest.indexOf('placeholder: ') - 2)
                }
                link = (
                    <a href={linkDest}>
                        {linkText}
                    </a>
                )
            }

            if (sec.includes("[video")) {
                vidLink = sec.substr(sec.indexOf('[') + 6, sec.indexOf(']') - (sec.indexOf('[') + 6))
                video = (
                    <VideoPlayer video={vidLink} />
                )
            }

            if (sec.includes("[phone")) {
                destNum = sec.substr(sec.indexOf('[') + 6, sec.indexOf(']') - (sec.indexOf('[') + 6))
                number = (
                    <a href={`tel:${destNum}`}>
                        {destNum}
                    </a>
                )
            }

            let preLink = ""
            let postLink = ""

            if (link && linkDest || destNum && number || picture) {
                preLink = sec.substr(0, sec.indexOf('['))
                postLink = sec.substr(sec.indexOf(']') + 1)
            }
            else if (video && vidLink) {
                postLink = sec.substr(0, sec.length - (vidLink.length + 7))
            }
            else {
                postLink = sec
            }

            const outputClasses = classNames("text-block", [
                { name: "text-block__tabbed", include: tabbed }
            ])
            return (
                <div className={outputClasses} key={idx}>
                    {picture}
                    {preLink}
                    {link}
                    {number}
                    {postLink}
                    {video}
                </div>
            )
        }
        )
    }

    private selectPicture(input: string) {
        console.log("input: ", input)
        switch (input.trim()) {
            case "anxiety": return anxiety
            case "depression": return depression
            case "suicide": return suicide
            case "psychosis": return psychosis
        }
    }
}
