'use client'; 

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [name, setName] = useState('');
  const [responses, setResponses] = useState<any[]>([]);

  // 1. 응소자 목록 불러오기 및 실시간 감시
  useEffect(() => {
    // 초기 명단 불러오기
    const fetchResponses = async () => {
      const { data } = await supabase.from('responses').select('*').order('created_at', { ascending: false });
      if (data) setResponses(data);
    };
    fetchResponses();

    // 실시간으로 새로운 사람 추가되면 업데이트
    const channel = supabase.channel('realtime-responses')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'responses' }, 
      (payload) => {
        setResponses((prev) => [payload.new, ...prev]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  // 2. 응소 버튼 클릭 시 실행
  const handleResponse = async () => {
    if (!name) { alert('이름을 입력해주세요.'); return; }

    const { error } = await supabase.from('responses').insert([{ status: '응소완료', name }]);
    
    if (error) {
      alert('기록 실패: ' + error.message);
    } else {
      alert(name + '님, 응소 완료되었습니다!');
      setName(''); // 입력창 초기화
    }
  };

  return (
    <div style={{ padding: "30px", textAlign: "center", fontFamily: "sans-serif" }}>
      <h1>남부소방서 비상소집 시스템</h1>
      
      <div style={{ margin: "20px 0" }}>
        <input 
          type="text" 
          placeholder="성함을 입력하세요" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "10px", fontSize: "1rem", marginRight: "10px" }}
        />
        <button onClick={handleResponse} style={{ padding: "10px 20px", fontSize: "1rem", backgroundColor: "#e11d48", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          응소하기
        </button>
      </div>

      <div style={{ marginTop: "40px", borderTop: "2px solid #ccc", paddingTop: "20px" }}>
        <h2>현재 응소 현황 ({responses.length}명)</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {responses.map((res: any, index: number) => (
            <li key={index} style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
              {res.name} - {new Date(res.created_at).toLocaleTimeString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
