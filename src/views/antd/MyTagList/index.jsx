import React, { useState, useEffect, useRef } from 'react';
import { Tag } from 'antd';
import { generateRandomArray, getRandomInt } from './utils';

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
      const containerWidth = container.offsetWidth;
      const tags = container.getElementsByClassName('tag');
      let totalWidth = 0;
      let count = 0;
      for (let i = 0; i < tags.length; i++) {
        const tagWidth = tags[i].offsetWidth;
        totalWidth += tagWidth;
        if (totalWidth > containerWidth) {
          count = i;
          break;
        }
      }
      const hiddenTags = data.length - count;
      console.log('hiddenTags', hiddenTags);
      if (hiddenTags > 0) {
        const ellipsisTag = document.createElement('div');
        ellipsisTag.className = 'ellipsisTag';
        ellipsisTag.textContent = `+${hiddenTags} more`;
        ellipsisTag.addEventListener('click', handleEllipsisClick);
        container.appendChild(ellipsisTag);
      }
    }
  };

  const handleEllipsisClick = () => {
    // 点击隐藏的标签时的逻辑
    console.log('点击了隐藏的标签');
  };

  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <div ref={containerRef} style={{ overflow: 'hidden', width: '300px', height: '70px', display: 'flex', flexWrap: 'wrap', gap: 10, padding: 10, border: '1px solid #000' }}>
        {data.map((item, index) => (
          <Tag key={index} className="tag" color={item % 2 === 0 ? 'blue' : 'red'}>{item}</Tag>
        ))}
      </div>
      <div>对比</div>
      <div style={{ width: '300px', height: '70px', display: 'flex', flexWrap: 'wrap', gap: 10, padding: 10, border: '1px solid #000' }}>
        {data.map((item, index) => (
          <Tag key={index} className="tag" color={item % 2 === 0 ? 'blue' : 'red'}>{item}</Tag>
        ))}
      </div>
    </div>
  );
};

export default MyTagList;
