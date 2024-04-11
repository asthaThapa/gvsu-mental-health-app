import React from 'react';
import { classNames } from '../../utils/system';
import VideoPreview from '../video_player';
import { IonImg } from '@ionic/react';
import anxiety from '../../assets/Anxiety.png';
import depression from '../../assets/Depression.png';
import suicide from '../../assets/Suicide.png';
import psychosis from '../../assets/psychosis.png';

import './index.scss';

export interface TextBlockProps {
  input: string;
}

// const ReadMore = ({ children }: any) => {
//   const text = children;
//   const [isReadMore, setIsReadMore] = useState(true);
//   const toggleReadMore = () => {
//     setIsReadMore(!isReadMore);
//   };
//   return (
//     <p className="text">
//       {isReadMore ? text.slice(0, 100) : text}
//       <span
//         onClick={toggleReadMore}
//         className="read-or-hide"
//         style={{ color: "green" }}
//       >
//         {isReadMore ? "...read more" : " show less"}
//       </span>
//     </p>
//   );
// };


export default class TextBlock extends React.Component<TextBlockProps> {
  public render() {
    const sections = [];
    const curr = this.props.input;
    let index = 0;
    for (let i = 0; i < curr.length; i++) {
      if (curr[i] === '\n') {
        sections.push(curr.substr(index, i - index));
        index = i + 1;
      }
    }

    if (sections.length === 0) {
      sections.push(curr);
    } else {
      sections.push(curr.substr(index));
    }

    return sections.map((sec, idx) => {
      let tabbed = false;
      let link = null;
      let linkDest = null;
      let vidLink = null;
      let video = null;
      let number = null;
      let destNum = null;
      let picture = null;
      let header = null;
      // let readMore = null;

      if (sec[0] === '-') {
        sec = sec.substr(1);
        tabbed = true;
      }

      if (sec.includes('[picture')) {
        const picLink = sec.substr(
          sec.indexOf('[') + 8,
          sec.indexOf(']') - (sec.indexOf('[') + 8),
        );
        const pic = this.selectPicture(picLink);
        picture = <IonImg className="resource-tile__image" src={pic} />;
      }

      if (sec.includes('[link')) {
        linkDest = sec.substr(
          sec.indexOf('[') + 5,
          sec.indexOf(']') - (sec.indexOf('[') + 5),
        );
        let linkText = linkDest.substr(13);
        if (linkDest.includes('placeholder: ')) {
          linkText = linkDest.substr(linkDest.indexOf('placeholder: ') + 13);
          linkDest = linkDest.substr(0, linkDest.indexOf('placeholder: ') - 2);
        }
        link = <a href={linkDest} target="_blank">{linkText}</a>;
      }

      if (sec.includes('[video')) {
        vidLink = sec.substr(
          sec.indexOf('[') + 8,
          sec.indexOf(']') - (sec.indexOf('[') + 8),
        );
        video = <VideoPreview video={vidLink} />;
      }

      if (sec.includes('[phone')) {
        let secStart = sec.indexOf('[phone') + 7;
        let secEnd = sec.indexOf(']', secStart);
        destNum = sec.substr(secStart, secEnd - secStart);
        number = <a href={`tel:${destNum}`}>{destNum}</a>;
      }

      if (sec.includes('[header')) {
        header = (
          <div className="guide-view__modal-subheader">
            {sec.substr(7, sec.indexOf(']') - (sec.indexOf('[') + 7))}
          </div>
        );
      }

      let preLink = '';
      let postLink = '';

      if ((link && linkDest) || (destNum && number) || picture) {
        preLink = sec.substr(0, sec.indexOf('['));
        postLink = sec.substr(sec.indexOf(']') + 1);
      } else if (video && vidLink) {
        postLink = sec.substr(0, sec.length - (vidLink.length + 9));
      } else if (header) {
        postLink = '';
      } else {
        postLink = sec;
      }

      const outputClasses = classNames('text-block', [
        { name: 'text-block__tabbed', include: tabbed },
      ]);

      if (sec === '[br]') {
        return <div className="text-block__break" />;
      }

      return (
        <div className={outputClasses} key={idx}>
          {picture}
          {preLink}
          {header}
          {link}
          {number}
          {postLink}
          {video}
        </div>
      );
    });
  }

  private selectPicture(input: string) {
    switch (input.trim()) {
      case 'anxiety':
        return anxiety;
      case 'depression':
        return depression;
      case 'suicide':
        return suicide;
      case 'psychosis':
        return psychosis;
    }
  }
}
