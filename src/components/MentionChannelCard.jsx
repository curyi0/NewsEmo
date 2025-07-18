import React from 'react';
import { useSelector } from 'react-redux';

const MentionChannelCard = ({ keyword, period, totalCount, viewCount, items=[] }) => {
  const company = useSelector(state => state.company);
  return (
    <div
      className="layout-card layout-card-originals"
      id="move-document-list-all"
      category="소셜분석-언급량분석"
      label="소셜-언급량"
    >
      <div className="vskeleton-container">
        <div className="vskeleton-target" data-id="originalDocsUl" style={{ opacity: 1 }}>
          <div className="layout-card-header layout-card-header-type2">
            <div className="layout-card-header-title">
              <h6
                className="layout-card-title1"
                id="analysis-keyword"
                category="소셜분석-언급량분석"
                label="소셜-언급량"
              >
                {keyword}
              </h6>
              <div className="reset-date">
                <button type="button" className="vbtn btn-reset-icon" aria-label="전체기간으로 리셋">
                  <i className="ri-restart-line"></i>
                </button>
                <span className="date original-document-period">{period}</span>
              </div>
            </div>
          </div>

          <div className="original-document-restriction-bar main-view">
            <a href="/service/pricing" target="_blank">
              총 <span className="document-total-count">{totalCount}</span>건 중
              <span className="document-view-count">{viewCount}</span>건 표시됨. 결과 더보기
            </a>
            <span className="inline-block" style={{ lineHeight: 1 }}>
              <i className="mgc_information_line"></i>
            </span>
            <div className="vtooltip original-document-restriction-bar-tooltip-main-view">
              <div className="vtooltip-content">
                <p>프리미엄 플랜 : 채널 별 최대 500건 제공<br />비즈니스 플랜 : 썸트렌드 최대 건수 제공</p>
              </div>
            </div>
          </div>

          <div className="original-data">
            <div className="hidden-scroll yscroll-overlay">
              <ul className="hidden-scroll-content yscroll-overlay-body original-data-list mention-original-list">
                {items.map((item, idx) => (
                  <li
                    key={idx}
                    className="original-data-item"
                    onClick={() => window.open(item.url, '_blank')}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="icon-channel">
                      <img src={item.icon} alt="" />
                    </span>
                    <dl className="mention-desc">
                      <dt className="mention-desc-title" dangerouslySetInnerHTML={{ __html: item.title }} />
                      <dd className="mention-desc-text" dangerouslySetInnerHTML={{ __html: item.text }} />
                    </dl>
                  </li>
                ))}
              </ul>
            </div>
            <button type="button" className="vbtn btn-fill-primary-alpha5-primary small btn-more-original">
              자세히 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentionChannelCard;
