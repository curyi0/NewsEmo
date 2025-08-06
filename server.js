const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/service_inquiry_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB 연결 성공'))
.catch(err => console.error('MongoDB 연결 실패:', err));

// 서비스 문의 스키마 정의
const serviceInquirySchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  consultationType: {
    type: String,
    required: true,
    enum: ['email', 'online', 'offline']
  },
  purpose: {
    type: String,
    required: true
  },
  file: {
    type: String, // 파일 경로 저장
    default: null
  },
  agree: {
    type: Boolean,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ServiceInquiry = mongoose.model('ServiceInquiry', serviceInquirySchema);

// 파일 업로드 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB 제한
  }
});

// 서비스 문의 API 엔드포인트
app.post('/api/serviceAsk', upload.single('file'), async (req, res) => {
  try {
    const { company, consultationType, purpose, agree } = req.body;
    
    // 필수 필드 검증
    if (!company || !consultationType || !purpose || !agree) {
      return res.status(400).json({
        success: false,
        message: '필수 필드가 누락되었습니다.'
      });
    }

    // 새로운 서비스 문의 생성
    const serviceInquiry = new ServiceInquiry({
      company,
      consultationType,
      purpose,
      file: req.file ? req.file.path : null,
      agree: agree === 'true'
    });

    // 데이터베이스에 저장
    await serviceInquiry.save();

    res.status(201).json({
      success: true,
      message: '서비스 문의가 성공적으로 접수되었습니다.',
      data: {
        id: serviceInquiry._id,
        company: serviceInquiry.company,
        consultationType: serviceInquiry.consultationType,
        createdAt: serviceInquiry.createdAt
      }
    });

  } catch (error) {
    console.error('서비스 문의 저장 오류:', error);
    res.status(500).json({
      success: false,
      message: '서비스 문의 접수 중 오류가 발생했습니다.'
    });
  }
});

// 서비스 문의 목록 조회 API (관리자용)
app.get('/api/service-inquiries', async (req, res) => {
  try {
    const inquiries = await ServiceInquiry.find()
      .sort({ createdAt: -1 })
      .select('-__v');
    
    res.json({
      success: true,
      data: inquiries
    });
  } catch (error) {
    console.error('서비스 문의 조회 오류:', error);
    res.status(500).json({
      success: false,
      message: '서비스 문의 조회 중 오류가 발생했습니다.'
    });
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
}); 