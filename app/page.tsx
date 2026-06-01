'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [name, setName] = useState('');
  const [allEmployees, setAllEmployees] = useState<any[]>([]);
  const [responses, setResponses] = useState<any[]>([]);

  useEffect(() => {
    // 1. 전체 명단과 응소 명단 모두 불러오기
    const fetchData = async () => {
      const { data: employees } = await supabase.from('employees').select('*');
      const { data: res } = await supabase.from('responses').select('*');
      if (employees) setAllEmployees(employees);
      if (res) setResponses(res);
    };
    fetchData();
  }, []);

  const handleResponse = async () => {
    // 명단 확인: 입력한 이름이 employees 테이블에 있는지 확인
    const isMember = allEmployees.some(emp => emp.name === name);
    if (!isMember) { alert('등록된 직원이 아닙니다. 명단을 확인하세요.'); return; }

    const { error } = await supabase.from('responses').insert([{ status: '응소완료', name }]);
    if (error) { alert('기록 실패: ' + error.message); } 
    else { alert(name + '님 응소 완료!'); setName(''); }
  };

  // 응소한 사람 목록
  const respondedNames = responses.map(r => r.name);
  // 미응소자 목록
  const notResponded = allEmployees.filter(emp => !respondedNames.includes(emp.name));

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>남부소방서 응소 현황</h1>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="이름 입력" />
      <button onClick={handleResponse}>응소하기</button>

      <div style={{ marginTop: "30px" }}>
        <h3>응소 완료 ({respondedNames.length}명)</h3>
        <p>{respondedNames.join(', ')}</p>
        
        <h3 style={{ color: 'red' }}>미응소 ({notResponded.length}명)</h3>
        <p>{notResponded.map(e => e.name).join(', ')}</p>
      </div>
    </div>
  );
}
