'use client'; // 이 줄이 파일 맨 위에 꼭 있어야 합니다!
import { supabase } from '@/lib/supabase';

export default function Home() {
  const handleResponse = async () => {
    // Supabase의 'responses' 테이블에 데이터를 삽입합니다.
    const { error } = await supabase
      .from('responses')
      .insert([{ status: '응소완료' }]);
    
    if (error) {
      alert('기록 실패: ' + error.message);
    } else {
      alert('남부소방서 응소 완료되었습니다!');
    }
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>남부소방서 비상소집 시스템</h1>
      <p style={{ marginBottom: "30px", color: "#666" }}>대원 여러분, 본인 확인 후 아래 버튼을 눌러주세요.</p>
      
      <button 
        onClick={handleResponse} 
        style={{ 
          padding: "20px 40px", 
          fontSize: "1.5rem", 
          backgroundColor: "#e11d48", 
          color: "white", 
          border: "none", 
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        응소하기
      </button>
    </div>
  );
}