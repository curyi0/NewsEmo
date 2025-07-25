import { Liquid } from '@ant-design/plots';
import React from 'react';

const CompanyReview = () => {
  const config = {
    percent: 0.3,
    style: {
      outlineBorder: 4,
      outlineDistance: 8,
      waveLength: 128,
    },
    width: 200,
    height: 200,
  };

  const containerStyle = {
  display: 'flex',
  justifyContent: 'center',  // Áß¾Ó Á¤·Ä
  gap: '24px',                // ¿ä¼Ò °£ °íÁ¤ °£°Ý
  padding: '20px',
};

  return (
    <div style={containerStyle}>
      <div>
        <div>±àÁ¤·ü</div>
        <Liquid {...config} />
      </div>
      <div>
        <div>ºÎÁ¤·ü</div>
        <Liquid {...config} />
      </div>
      <div>
        <div>Áß¸³·ü</div>
        <Liquid {...config} />
      </div>
    </div>
  );
};

export default CompanyReview;
