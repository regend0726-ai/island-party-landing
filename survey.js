let currentStep = 1;
const totalSteps = 6;
let surveyData = {
    name: '',
    gender: '',
    birthYear: '',
    photo: null,
    phoneNumber: '',
    instagram: ''
};

// DOM 요소들
const progressFill = document.getElementById('progressFill');
const currentStepSpan = document.getElementById('currentStep');

// 초기화
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
    setupEventListeners();
});

function setupEventListeners() {
    // 성함 입력 다음 버튼
    document.getElementById('nameNext').addEventListener('click', function() {
        const nameInput = document.getElementById('userName');
        if (validateName(nameInput.value)) {
            surveyData.name = nameInput.value.trim();
            nextStep();
        }
    });

    // 성별 선택 버튼들
    const genderButtons = document.querySelectorAll('#step2 .option-btn');
    genderButtons.forEach(button => {
        button.addEventListener('click', function() {
            surveyData.gender = this.dataset.value;
            nextStep();
        });
    });

    // 년생 입력
    document.getElementById('yearNext').addEventListener('click', function() {
        const birthYear = document.getElementById('birthYear').value;
        if (validateBirthYear(birthYear)) {
            surveyData.birthYear = birthYear;
            nextStep();
        }
    });

    document.getElementById('yearBack').addEventListener('click', function() {
        previousStep();
    });

    // 사진 업로드
    document.getElementById('uploadBtn').addEventListener('click', function() {
        document.getElementById('facePhoto').click();
    });

    document.getElementById('facePhoto').addEventListener('change', function(e) {
        handlePhotoUpload(e);
    });

    document.getElementById('photoNext').addEventListener('click', function() {
        nextStep();
    });

    document.getElementById('photoBack').addEventListener('click', function() {
        previousStep();
    });

    // 연락처 입력
    document.getElementById('phoneNext').addEventListener('click', function() {
        const phoneNumber = document.getElementById('phoneNumber').value;
        if (validatePhoneNumber(phoneNumber)) {
            surveyData.phoneNumber = phoneNumber;
            nextStep();
        }
    });

    document.getElementById('phoneBack').addEventListener('click', function() {
        previousStep();
    });

    // 인스타그램 아이디
    document.getElementById('instaNext').addEventListener('click', function() {
        const instagram = document.getElementById('instagram').value;
        if (validateInstagram(instagram)) {
            surveyData.instagram = instagram;
            completeSurvey();
        }
    });

    document.getElementById('instaBack').addEventListener('click', function() {
        previousStep();
    });

    // Enter 키 이벤트
    document.getElementById('birthYear').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('yearNext').click();
        }
    });

    document.getElementById('phoneNumber').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('phoneNext').click();
        }
    });

    document.getElementById('instagram').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('instaNext').click();
        }
    });
}

function validateName(name) {
    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
        alert('성함을 2글자 이상 입력해주세요.');
        return false;
    }
    if (trimmedName.length > 10) {
        alert('성함을 10글자 이하로 입력해주세요.');
        return false;
    }
    if (!/^[가-힣a-zA-Z\s]+$/.test(trimmedName)) {
        alert('성함은 한글 또는 영문만 입력 가능합니다.');
        return false;
    }
    return true;
}

function validateBirthYear(year) {
    if (!year) {
        alert('년도를 입력해주세요.');
        return false;
    }

    const yearNum = parseInt(year);
    if (yearNum < 1980 || yearNum > 2010) {
        alert('1980년부터 2010년 사이의 년도를 입력해주세요.');
        return false;
    }

    return true;
}

function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    // 파일 타입 검증
    if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
    }

    // 파일 크기 검증 (5MB 제한)
    if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB 이하여야 합니다.');
        return;
    }

    // 미리보기 생성
    const reader = new FileReader();
    reader.onload = function(e) {
        const preview = document.getElementById('uploadPreview');
        preview.innerHTML = `<img src="${e.target.result}" alt="업로드된 사진">`;
        preview.style.display = 'block';

        // 다음 버튼 표시
        document.getElementById('photoButtons').style.display = 'block';

        // 데이터 저장
        surveyData.photo = file;
    };
    reader.readAsDataURL(file);
}

function validatePhoneNumber(phoneNumber) {
    if (!phoneNumber) {
        alert('연락처를 입력해주세요.');
        return false;
    }

    // 전화번호 형식 검증 (010-1234-5678 또는 01012345678)
    const phoneRegex = /^010[-\s]?\d{4}[-\s]?\d{4}$/;
    if (!phoneRegex.test(phoneNumber)) {
        alert('올바른 전화번호 형식으로 입력해주세요. (예: 010-1234-5678)');
        return false;
    }

    return true;
}

function validateInstagram(instagram) {
    if (!instagram) {
        alert('인스타그램 아이디를 입력해주세요.');
        return false;
    }

    // 인스타그램 아이디 형식 검증 (영문, 숫자, 언더스코어, 점만 허용)
    const instagramRegex = /^[a-zA-Z0-9._]+$/;
    if (!instagramRegex.test(instagram)) {
        alert('올바른 인스타그램 아이디 형식이 아닙니다.');
        return false;
    }

    return true;
}

function nextStep() {
    // 현재 단계 숨기기
    document.getElementById(`step${currentStep}`).classList.remove('active');

    // 다음 단계로
    currentStep++;

    // 다음 단계 보이기
    document.getElementById(`step${currentStep}`).classList.add('active');

    // 진행률 업데이트
    updateProgress();
}

function previousStep() {
    if (currentStep <= 1) return; // 첫 번째 단계에서는 뒤로 갈 수 없음

    // 현재 단계 숨기기
    document.getElementById(`step${currentStep}`).classList.remove('active');

    // 이전 단계로
    currentStep--;

    // 이전 단계 보이기
    document.getElementById(`step${currentStep}`).classList.add('active');

    // 진행률 업데이트
    updateProgress();

    // 사진 업로드 단계에서 뒤로 갈 때 버튼 상태 복원
    if (currentStep === 4 && surveyData.photo) {
        document.getElementById('photoButtons').style.display = 'block';
    }
}

function updateProgress() {
    const progress = (currentStep / totalSteps) * 100;
    progressFill.style.width = `${progress}%`;
    currentStepSpan.textContent = currentStep;
}

// 파일을 DataURL로 변환하는 헬퍼 함수
async function fileToDataURL(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
    });
}

async function completeSurvey() {
    try {
        // 로딩 표시
        document.getElementById('instaNext').textContent = '저장 중...';
        document.getElementById('instaNext').disabled = true;

        let photoURL = null;

        // 사진이 있는 경우 Firebase Storage에 업로드
        if (surveyData.photo && typeof window.firebaseRef !== 'undefined') {
            const photoRef = window.firebaseRef(window.firebaseStorage, `photos/${Date.now()}_${surveyData.photo.name}`);
            const snapshot = await window.firebaseUploadBytes(photoRef, surveyData.photo);
            photoURL = await window.firebaseGetDownloadURL(snapshot.ref);
        }

        let docRef = null;
        
        // Firestore에 데이터 저장
        if (typeof window.firebaseAddDoc !== 'undefined') {
            docRef = await window.firebaseAddDoc(window.firebaseCollection(window.firebaseDB, 'survey-responses'), {
                name: surveyData.name,
                gender: surveyData.gender,
                birthYear: surveyData.birthYear,
                phoneNumber: surveyData.phoneNumber,
                instagram: surveyData.instagram,
                photoURL: photoURL,
                submittedAt: window.firebaseServerTimestamp(),
                createdAt: new Date().toISOString()
            });

            // localStorage에 백업 저장
            const backupData = {
                name: surveyData.name,
                gender: surveyData.gender,
                birthYear: surveyData.birthYear,
                phoneNumber: surveyData.phoneNumber,
                instagram: surveyData.instagram,
                photoDataURL: surveyData.photo ? await fileToDataURL(surveyData.photo) : null,
                submittedAt: new Date().toISOString()
            };
            localStorage.setItem('surveyData', JSON.stringify(backupData));
            
            console.log('설문 데이터가 Firebase에 저장되었습니다. ID:', docRef.id);
        }
        
        // 마지막 단계 숨기기
        document.getElementById(`step${currentStep}`).classList.remove('active');
        
        // 완료 페이지 보이기
        document.getElementById('stepComplete').classList.add('active');
        
        // 진행률 100%로
        progressFill.style.width = '100%';
        currentStepSpan.textContent = totalSteps;
        
        // 로컬 스토리지에도 백업 저장
        localStorage.setItem('surveyData', JSON.stringify({
            ...surveyData,
            firebaseId: docRef ? docRef.id : null,
            savedAt: new Date().toISOString()
        }));
        
    } catch (error) {
        console.error('Firebase 저장 중 오류:', error);
        
        // Firebase 설정이 안된 경우 (개발/테스트 환경)
        if (error.message.includes('your-api-key') || error.message.includes('your-project')) {
            console.log('Firebase 설정이 필요합니다. 로컬 스토리지에 저장합니다.');
            
            // 로컬 스토리지에 저장
            localStorage.setItem('surveyData', JSON.stringify({
                ...surveyData,
                savedAt: new Date().toISOString(),
                note: 'Firebase 미설정으로 로컬 저장'
            }));
        } else {
            // 실제 Firebase 오류인 경우
            localStorage.setItem('surveyData', JSON.stringify({
                ...surveyData,
                error: error.message,
                savedAt: new Date().toISOString()
            }));
            
            alert('데이터 저장 중 오류가 발생했습니다. 관리자에게 문의해주세요.');
        }
        
        // 완료 페이지로 이동
        document.getElementById(`step${currentStep}`).classList.remove('active');
        document.getElementById('stepComplete').classList.add('active');
        progressFill.style.width = '100%';
        currentStepSpan.textContent = totalSteps;
    } finally {
        // 버튼 상태 복원
        document.getElementById('instaNext').textContent = '완료';
        document.getElementById('instaNext').disabled = false;
    }
}
