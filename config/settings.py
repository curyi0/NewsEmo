from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-j!@0*2e%n*hy*=&zkui$a3cpu_@(hm24*hp$3hxk#n-wm#4^56'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ["*"]

# Application definition
INSTALLED_APPS = [
  'app',
  'rest_framework',
  'corsheaders',
  'django.contrib.contenttypes',  
  'django.contrib.auth',
  'django.contrib.staticfiles',
]

MIDDLEWARE = [
  'corsheaders.middleware.CorsMiddleware',
  'django.middleware.security.SecurityMiddleware',
  'django.middleware.common.CommonMiddleware',
  'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
  {
    'BACKEND': 'django.template.backends.django.DjangoTemplates',
    'DIRS': [],
    'APP_DIRS': True,
    'OPTIONS': {
      'context_processors': [
        'django.template.context_processors.debug',
        'django.template.context_processors.request',
      ],
    },
  },
]

WSGI_APPLICATION = 'config.wsgi.application'

# MongoDB 설정
MONGODB_SETTINGS = {
  'db': 'company_db',
  'host': 'localhost',
  'port': 27017,
}

# Redis 설정
REDIS_SETTINGS = {
  'host': 'localhost',
  'port': 6379,
  'db': 0,
  'password': None,
  'decode_responses': True,
}

# Django-Redis 캐시 설정
CACHES = {
  'default': {
    'BACKEND': 'django_redis.cache.RedisCache',
    'LOCATION': 'redis://127.0.0.1:6379/1',
    'OPTIONS': {
      'CLIENT_CLASS': 'django_redis.client.DefaultClient',
    }
  }
}

# 세션 저장소를 Redis로 설정
SESSION_ENGINE = 'django.contrib.sessions.backends.cache'
SESSION_CACHE_ALIAS = 'default'

# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'ko-kr'

TIME_ZONE = 'Asia/Seoul'

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Django REST Framework 설정
REST_FRAMEWORK = {
  'DEFAULT_PERMISSION_CLASSES': [
    'rest_framework.permissions.AllowAny',  # 개발 단계에서 모든 접근 허용
  ],
  'DEFAULT_AUTHENTICATION_CLASSES': [],  # 인증 비활성화 (MongoDB 전용)
}

# CORS 설정
CORS_ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:8080",
]

CORS_ALLOW_CREDENTIALS = True

# 개발환경에서 모든 origin 허용
if DEBUG:
  CORS_ALLOW_ALL_ORIGINS = True