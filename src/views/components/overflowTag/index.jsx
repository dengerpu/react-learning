import React, { useRef, useEffect, useState } from 'react';
import { Tag, Tooltip } from 'antd';
import'./index.scss';

const DOT_WIDTH = 40;

const OverflowTag = ({ 
    tags = [],
    lineHeight = 32,
    maxLines = 1,
    gutter = 8
 }) => {
    const tagWrapperRef = useRef(null);
    const [isDotflow, setIsDotflow] = useState(false);
    const [maxTagWidth, setMaxTagWidth] = useState(0);
    const [pivot, setPivot] = useState(0);
    const [restNumber, setRestNumber] = useState(0);

    const calc = () => {
        const clientWidth = tagWrapperRef.current.clientWidth;
        setMaxTagWidth(clientWidth - DOT_WIDTH - 2 * gutter);
    };

    useEffect(() => {
        calc();
    },[tags, lineHeight, maxLines, gutter]);

    useEffect(() => {
        // 获取容器的宽度
        const clientWidth = tagWrapperRef.current.clientWidth;
        // 容器应该有的高度（行高*行数）
        const maxContainerHeight = lineHeight * maxLines;
        setPivot(null);
        setRestNumber(0);
        setIsDotflow(false);

        setTimeout(() => {
            // 获取容器的实际高度
            const clientHeight = tagWrapperRef.current.clientHeight;
            console.log('高度', clientHeight, '宽度', clientWidth);
            if(clientHeight > maxContainerHeight) {
                const lineSizeList = Array(maxLines).fill(clientWidth);

                const tagsDom = tagWrapperRef.current.querySelectorAll('.tag');
                console.log('tags', tagsDom);
                let line = 0;

                for(let i = 0; i < tagsDom.length; i++) {
                    const width = tagsDom[i].clientWidth + gutter;
                    console.log('line', line, lineSizeList)
                    if(lineSizeList[line] - width > DOT_WIDTH) {
                        lineSizeList[line] -= width;
                    } else {
                        if(line + 1 < maxLines) {
                            line++;
                            lineSizeList[line] -= width;
                        } else {
                            console.log('超出', i - 1);
                            setPivot(i - 1);
                            setRestNumber(tagsDom.length - i);
                            setIsDotflow(true);
                            return;
                        }
                    }
                }
            }
        }, 0)
    },[maxTagWidth])

    const isHidden = (index) => {
        if(pivot === null) return false;
        return index > pivot;
    }

    const tooltipNode = () => {
        return <>
            <div className='c-overflow-tag-wrap'>
                {tags.slice(pivot + 1).map((item, index) => {
                    return <span key={index} className='tag'>
                        {item}
                    </span> 
                })
                }
            </div>
        </>
    }

    return (
        <div className='c-overflow-tag' ref={tagWrapperRef}>
            <div className='tag-list'>
                {tags.map((item, index) => {
                    return (
                        <span key={index} style={{
                            maxWidth: `${maxTagWidth}px`,
                            marginRight: `${gutter}px`
                        }} className={`tag ${isHidden(index) ? 'hidden' : ''} ${index - 1 === pivot ? 'first' : ''}`}>
                            {item}
                        </span>
                    )
                })}
                <Tooltip
                    placement='top'
                    title={tooltipNode}
                >
                    {
                        isDotflow && (
                            <span className='dot'>
                                {restNumber ? '+' + restNumber : '...'}
                            </span>
                        )
                    }
                </Tooltip>
            </div>
        </div>
    )
}
export default OverflowTag;