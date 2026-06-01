'use client';

import { useState } from 'react';

export default function Home() {
  const departments = [
    { name: '소방서장', count: 1 },
    { name: '청문감사담당관', count: 7 },
    { name: '소방행정과', count: 9 },
    { name: '예방안전과', count: 15 },
    { name: '구조구급과', count: 8 },
    { name: '현장대응단', count: 23 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans">
      {/* 헤더 부분 */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-blue-900 mb-2">남부소방서</h1>
        <h2 className="text-xl font-bold text-blue-900">긴급구조통제단</h2>
        <p className="text-gray-500 mt-4">응소를 위해 소속 부서를 선택하세요</p>
      </div>

      {/* 부서 선택 버튼 그리드 */}
      <div className="grid grid-cols-2 gap-4">
        {departments.map((dept) => (
          <button
            key={dept.name}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center hover:bg-blue-50 transition-colors"
          >
            <div className="text-lg font-bold text-gray-800">{dept.name}</div>
            <div className="text-sm text-gray-500 mt-1">{dept.count}명</div>
          </button>
        ))}
      </div>

      {/* 하단 공통 영역 */}
      <div className="mt-8 bg-blue-100 p-4 rounded-xl flex items-center justify-between border border-blue-200">
        <span className="font-bold text-blue-900">통제단 외 직원 입장</span>
        <span className="text-xs text-blue-700">구급대원·유관기관 전용</span>
      </div>
    </div>
  );
}
