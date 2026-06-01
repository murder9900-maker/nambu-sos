'use client';

import { useState } from 'react';

export default function Home() {
  // 현재 보고 있는 화면을 관리 (메인 or 상세)
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  const departments = [
    { name: '소방서장', title: '소방정', person: '제용기' },
    { name: '청문감사담당관', count: 7 },
    { name: '소방행정과', count: 9 },
    { name: '예방안전과', count: 15 },
    { name: '구조구급과', count: 8 },
    { name: '현장대응단', count: 23 },
  ];

  // 메인 화면
  if (!selectedDept) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold text-blue-900">남부소방서 긴급구조통제단</h1>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {departments.map((dept) => (
            <button key={dept.name} onClick={() => setSelectedDept(dept.name)} className="bg-white p-6 rounded-xl shadow border text-center">
              <div className="font-bold">{dept.name}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 소방서장 상세 화면 (주임님 캡처 화면 구현)
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <button onClick={() => setSelectedDept(null)} className="mb-4 text-2xl">←</button>
      <h2 className="text-center font-bold text-xl mb-6">소방서장</h2>
      
      <div className="bg-white p-6 rounded-2xl shadow-sm border mb-6">
        <div className="text-yellow-500 mb-2">★ 선택된 인원</div>
        <div className="space-y-4">
          <div className="flex justify-between"><span>직위</span><span className="font-bold">소방서장</span></div>
          <div className="flex justify-between"><span>직급</span><span>소방정</span></div>
          <div className="flex justify-between"><span>성명</span><span>제용기</span></div>
          <div className="flex justify-between"><span>편성부서</span><span className="text-yellow-600">★ 긴급구조통제단장</span></div>
        </div>
      </div>

      <button className="w-full bg-blue-500 text-white p-4 rounded-xl font-bold text-lg">응소 완료</button>
    </div>
  );
}
