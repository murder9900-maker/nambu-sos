'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [name, setName] = useState('');
  const [allEmployees, setAllEmployees] = useState<any[]>([]);
  const [responses, setResponses] = useState<any[]>([]);

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

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>남부소방서 비상소집 상황판</h1>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="성함 입력" style={{ flex: 1, padding: "10px" }} />
        <button onClick={handleResponse} style={{ padding: "10px 20px", backgroundColor: "#e11d48", color: "white", border: "none" }}>응소하기</button>
      </div>

      <h3>명단 (총 {allEmployees.length}명)</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "5px" }}>
        {allEmployees.map((emp) => (
          <div key={emp.name} style={{ 
            padding: "10px", 
            backgroundColor: respondedNames.includes(emp.name) ? "#22c55e" : "#ef4444", 
            color: "white", borderRadius: "5px", textAlign: "center" 
          }}>
            {emp.name}
          </div>
        ))}
      </div>
    </div>
  );
}
