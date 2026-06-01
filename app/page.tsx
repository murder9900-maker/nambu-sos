'use client';

import { useState } from 'react';

export default function Home() {
  // 화면 전환을 위한 상태 관리
  const [view, setView] = useState('main'); // 'main' 또는 'chief'

  // 메인 화면 (부서 선택)
  if (view === 'main') {
    return (
      <div className="min-h-screen bg-gray-50 p-4 font-sans">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-900">남부소방서</h1>
          <h2 className="text-2xl font-bold text-blue-900">긴급구조통제단</h2>
          <p className="text-gray-600 mt-2">응소를 위해 소속 부서를 선택하세요</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => setView('chief')}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center hover:bg-blue-50"
          >
            <div className="text-xl font-bold">소방서장</div>
            <div className="text-gray-500">1명</div>
          </button>
          {/* 나머지 부서 버튼들은 동일한 방식으로 추가 가능합니다 */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center">
            <div className="text-xl font-bold">청문감사담당관</div>
            <div className="text-gray-500">7명</div>
          </div>
        </div>

        <div className="mt-8 bg-blue-100 p-4 rounded-xl flex items-center justify-between border border-blue-200">
          <span className="font-bold text-blue-900">통제단 외 직원 입장</span>
          <span className="text-xs text-blue-700">구급대원·유관기관 전용</span>
        </div>
      </div>
    );
  }

  // 소방서장 상세 화면 (응소 화면)
  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans">
      <button onClick={() => setView('main')} className="mb-4 text-gray-600 text-lg">← 이전</button>
      
      <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center">소방서장</h2>
        <div className="space-y-4 text-lg">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">직위</span>
            <span className="font-bold">소방서장</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">직급</span>
            <span>소방정</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">성명</span>
            <span>제용기</span>
          </div>
          <div className="flex justify-between pb-2">
            <span className="text-gray-500">편성부서</span>
            <span className="text-yellow-600 font-bold">긴급구조통제단장</span>
          </div>
        </div>
      </div>

      <button 
        className="w-full mt-8 bg-blue-600 text-white p-4 rounded-xl font-bold text-xl shadow-lg hover:bg-blue-700"
        onClick={() => alert('응소 완료되었습니다.')}
      >
        응소 완료
      </button>
    </div>
  );
}
