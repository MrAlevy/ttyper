import React from 'react';
import './styles/typer.scss';
import './styles/typer-text-line.scss';
import './styles/typer-speed-diagram.scss';

export const TyperMain = (props) => {
    const { 
        isErrorLetter, rightLetter, rightText, rightTextPast, 
        mistakes, lettersEntered, avgSpeed, curSpeed, 
        screenWidth, TEXT_LENGTH
    } = props.state;
    
    const {
        caption, rate, owner, bestSpeed, bestSpeedOwner, bestSpeedOwnerMistakes
    } = props.textInfo;

    // calc mistakes persentage
    let miss = Math.round(10* (100*mistakes/(lettersEntered || 1)) )/10

    // function for decrease width of speed diagram depends on current value of speed
    const speedWidth = (speedType) => {
        let maxDiagramWidth = (2)*0.7*(screenWidth > 1000 ? 929 : screenWidth*0.95)/2
        let maxSpeed = Math.max(avgSpeed, curSpeed);
        let coef = (maxSpeed>bestSpeed ? bestSpeed/maxSpeed : 1)*maxDiagramWidth
        if (Math.abs(maxSpeed - bestSpeed) >= 150) {coef = 1*coef}
        if (Math.abs(maxSpeed - bestSpeed) < 150) {coef = (0.5+Math.abs(maxSpeed - bestSpeed)/300)*coef}
        return coef*speedType/bestSpeed + 'px' || 0
    }

    // width of one delay of speed graph background
    const gradWidth = () => {
        return 6
    }


    return (
        <div className='dataCont typer-cont'>

            <div id='text-typer-info'>
                <div id='text-typer-main-info'>
                    <h1>{caption}</h1>
                </div>
    
                <div id='text-typer-rate'>
                    <div><span>rate:</span><div>{rate}</div></div> 
                    <div><span>owner:</span><div>{owner}</div></div> 
                </div>
    
                <div id='text-typer-miss'>
                    <div>
                        <span>miss:</span>
                        <div id='miss-value'>
                            <div>
                                <div>
                                    {bestSpeedOwnerMistakes ? bestSpeedOwnerMistakes : 0} %
                                </div>
                                <span>({bestSpeedOwner})</span>
                            </div>
                            <div>
                                <div id='yourMiss'>
                                    {miss ? miss : 0} % 
                                </div>
                                <span>(you)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div id='typer-speed-diagram'>
                    <div>
                        <div id='avg-speed' 
                            className={`${curSpeed < avgSpeed && 'avg-speed-lose'} ${bestSpeed < avgSpeed && 'avg-speed-win'}`} 
                            style={{width: speedWidth(avgSpeed)}}
                        >
                            <span id='avg-speed-label'>{avgSpeed}</span>
                            <div id='cur-speed' style={{width: speedWidth(curSpeed)}}>
                                <div id='best-speed' style={{width: speedWidth(bestSpeed)}}>
                                    <span>
                                        <span>
                                            {bestSpeed}
                                        </span>
                                        <span>
                                            <span>by</span>
                                            {bestSpeedOwner}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div 
                            id='speed-color-background'
                            style={{background: `repeating-linear-gradient(90deg, #61292b00, #85b56c00 1px, #bfb9c200 0px, #6e686f1f ${gradWidth()}px) fixed`}}
                        >
                        </div>
                    </div>
                </div>
    
                <div id='text-typer-cont'>
                    <div id='right-text-line'>
                        <div className={'text-t right-text-past ' + (!rightTextPast && 'empty-text-past')}>
                            {rightTextPast ? rightTextPast : 'press space to start '}
                        </div>
                        <div className={isErrorLetter ? 'text-t right-letter right-letter-error' : 'text-t right-letter'}>{rightLetter}</div>
                        <div className='text-t right-text'>
                            {
                                rightText 
                                    ? rightText && rightText.slice(0, 40) 
                                    : rightLetter
                                        ? ''
                                        : avgSpeed > bestSpeed
                                            ? ' new record!'
                                            : rightTextPast
                                                ? ' good luck next time'
                                                : ''
                            }
                        </div>
                    </div>
                </div>
    
                <div id='typer-progress'>
                    <div>
                        <div style={{width: ((100*lettersEntered/TEXT_LENGTH) || 0) + '%'}}>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}