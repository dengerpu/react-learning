import React, { useEffect, useRef } from 'react';
import { Tag } from 'antd';
import { generateRandomArray, getRandomInt } from './utils';
import './index.scss';

const MyTagList = () => {
  const data = generateRandomArray(getRandomInt(1, 50));
  const containerRef = useRef(null);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleResize = () => {
    const container = containerRef.current;
    console.log('container', container);
    if (container) {
      const containerWidth = (container.offsetWidth - 20 - 2);
      const tags = container.getElementsByClassName('tag');
      let totalWidth = 0;
      let count = 0;
      let height = 0; // 记录前一个值
      for (let i = 0; i < tags.length; i++) { // 10代表左边距
        const tagWidth = tags[i].offsetWidth + 10;  
        totalWidth += tagWidth;
        count = i;
        // 如果加了后一个能够容下，则继续加，不能加下，代表换行,totalWidth重置
        if(i + 1 < tags.length && totalWidth + tags[i+1].offsetWidth + 10 > containerWidth) {
          totalWidth = 0;
          height++;
          if(height === 2) {
            break;
          }
        }
      }
      const hiddenTags = data.length - count;
      console.log('hiddenTags', hiddenTags);
      if (hiddenTags > 0) {
        const ellipsisTag = document.createElement('div');
        ellipsisTag.className = 'ellipsisTag';
        ellipsisTag.textContent = `+${hiddenTags} more`;
        ellipsisTag.addEventListener('click', handleEllipsisClick);
        if(count + 1 < tags.length && totalWidth + 40  < containerWidth) {
          container.insertBefore(ellipsisTag, tags[count + 1]);
        } else {
          container.insertBefore(ellipsisTag, tags[count]);
        }
      }
    }
  };

  const handleEllipsisClick = () => {
    // 点击隐藏的标签时的逻辑
    console.log('点击了隐藏的标签');
  };

  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <div ref={containerRef} style={{ overflow: 'hidden', width: '300px', height: '70px', display: 'flex', flexWrap: 'wrap', padding: 10, border: '1px solid #000' }}>
        {data.map((item, index) => (
          <Tag key={index} className="tag" color={item % 2 === 0 ? 'blue' : 'red'}>{item}</Tag>
        ))}
      </div>
      <div>对比</div>
      <div style={{ width: '300px', height: '70px', display: 'flex', flexWrap: 'wrap', padding: 10, border: '1px solid #000' }}>
        {data.map((item, index) => (
          <Tag key={index} className="tag" color={item % 2 === 0 ? 'blue' : 'red'}>{item}</Tag>
        ))}
      </div>
    </div>
  );
};

export default MyTagList;
