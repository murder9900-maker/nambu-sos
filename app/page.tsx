'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [name, setName] = useState('');
  const [allEmployees, setAllEmployees] = useState<any[]>([]);
  const [responses, setResponses] = useState<any[]>([]);
  const [view, setView] = useState<'responded' | 'notResponded'>('responded');

  useEffect(() => {
    const fetchData = async () => {
      const { data: employees } = await supabase.from('직원명부').select('*');
      const { data: res } = await supabase.from('responses').select('*');
      if (employees) setAllEmployees(employees);
      if (res) setResponses(res);
    };
    fetchData();
  }, []);

  const handleResponse = async () => {
    // 1. 명단 존재 여부 확인
    if (!allEmployees.some(emp => emp.name === name)) {
      alert('등록된 직원이 아닙니다. 명단을 확인하세요.'); return;
    }
    
    // 2. 중복 응소 확인 (이미 응소 명단에 있는지)
    if (responses.some(r => r.name === name)) {
      alert('이미 응소 처리가 완료되었습니다!'); return;
    }

    const { error } = await supabase.from('responses').insert([{ status: '응소완료', name }]);
    if (error) alert('기록 실패: ' + error.message);
    else { alert(name + '님, 응소 완료!'); setName(''); window.location.reload(); }
  };

  const respondedNames = responses.map(r => r.name);
  const notResponded = allEmployees.filter(emp => !respondedNames.includes(emp.name));

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>남부소방서 비상소집 상황판</h1>
      
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="성함 입력" style={{ flex: 1, padding: "10px" }} />
        <button onClick={handleResponse} style={{ padding: "10px 20px", backgroundColor: "#e11d48", color: "white", border: "none", borderRadius: "5px" }}>응소하기</button>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={() => setView('responded')} style={{ flex: 1, padding: "10px", backgroundColor: view === 'responded' ? "#22c55e" : "#ccc" }}>응소자 ({respondedNames.length}명)</button>
        <button onClick={() => setView('notResponded')} style={{ flex: 1, padding: "10px", backgroundColor: view === 'notResponded' ? "#ef4444" : "#ccc" }}>미응소자 ({notResponded.length}명)</button>
      </div>

      <div style={{ padding: "15px", backgroundColor: "#f9f9f9", borderRadius: "5px" }}>
        {view === 'responded' ? (
          <div>
            {respondedNames.map((n, i) => <div key={i} style={{ padding: "5px", borderBottom: "1px solid #eee" }}>✅ {n}</div>)}
          </div>
        ) : (
          <div>
            {notResponded.map((e, i) => <div key={i} style={{ padding: "5px", borderBottom: "1px solid #eee" }}>❌ {e.name}</div>)}
          </div>
        )}
      </div>
    </div>
  );
}
