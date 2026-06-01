'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [name, setName] = useState('');
  const [allEmployees, setAllEmployees] = useState<any[]>([]);
  const [responses, setResponses] = useState<any[]>([]);
  const [view, setView] = useState<'responded' | 'notResponded'>('responded'); // 어떤 화면을 볼지 결정

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
    if (!allEmployees.some(emp => emp.name === name)) {
      alert('등록된 직원이 아닙니다. 명단을 확인하세요.'); return;
    }
    const { error } = await supabase.from('responses').insert([{ status: '응소완료', name }]);
    if (error) alert('기록 실패: ' + error.message);
    else { alert(name + '님, 응소 완료!'); setName(''); window.location.reload(); }
  };

  const respondedNames = responses.map(r => r.name);
  const notResponded = allEmployees.filter(emp => !respondedNames.includes(emp.name));

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
      <h1>남부소방서 비상소집</h1>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="본인 성함 입력" style={{ flex: 1, padding: "10px" }} />
        <button onClick={handleResponse} style={{ padding: "10px 20px", backgroundColor: "#e11d48", color: "white", border: "none", borderRadius: "5px" }}>응소하기</button>
      </div>

      {/* 탭 버튼 */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={() => setView('responded')} style={{ flex: 1, padding: "10px", backgroundColor: view === 'responded' ? "#22c55e" : "#ccc" }}>응소자 ({respondedNames.length}명)</button>
        <button onClick={() => setView('notResponded')} style={{ flex: 1, padding: "10px", backgroundColor: view === 'notResponded' ? "#ef4444" : "#ccc" }}>미응소자 ({notResponded.length}명)</button>
      </div>

      {/* 내용 표시 */}
      <div style={{ textAlign: "left", padding: "10px", backgroundColor: "#f9f9f9", borderRadius: "5px" }}>
        {view === 'responded' ? (
          <ul>{respondedNames.map(n => <li key={n}>{n}</li>)}</ul>
        ) : (
          <ul>{notResponded.map(e => <li key={e.name}>{e.name}</li>)}</ul>
        )}
      </div>
    </div>
  );
}
