'use client';

export default function Home() {
  const departments = [
    { name: '소방서장', count: '1명' },
    { name: '청문감사담당관', count: '7명' },
    { name: '소방행정과', count: '9명' },
    { name: '예방안전과', count: '15명' },
    { name: '구조구급과', count: '8명' },
    { name: '현장대응단', count: '23명' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans max-w-md mx-auto">
      {/* 상단 훈련 상태바 */}
      <div className="flex items-center justify-between mb-6">
        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">훈련</span>
        <span className="text-gray-500">개요 없음</span>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      </div>

      {/* 로고 및 제목 */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-2">
           {/* 로고 자리 (이미지 파일이 있다면 <img> 태그 사용) */}
           <div className="w-16 h-16 bg-blue-900 rounded-lg flex items-center justify-center text-white font-bold">119</div>
        </div>
        <h1 className="text-2xl font-bold text-blue-900">중부소방서</h1>
        <h2 className="text-2xl font-bold text-blue-900">긴급구조통제단</h2>
        <p className="text-gray-500 mt-4">응소를 위해 소속 부서를 선택하세요</p>
      </div>

      {/* 부서 그리드 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {departments.map((dept) => (
          <button
            key={dept.name}
            className="bg-white p-6 rounded-2xl shadow-[0_4px_6px_rgba(0,0,0,0.15)] border border-gray-100 text-center hover:bg-gray-50 transition-all"
          >
            <div className="text-lg font-bold text-gray-800">{dept.name}</div>
            <div className="text-gray-400 mt-1">{dept.count}</div>
          </button>
        ))}
      </div>

      {/* 하단 통제단 외 직원 입장 */}
      <div className="bg-blue-100 p-4 rounded-2xl flex items-center border border-blue-200">
        <span className="text-2xl mr-3">👁️</span>
        <div>
          <div className="font-bold text-blue-900">통제단 외 직원 입장</div>
          <div className="text-sm text-blue-700">구급대원·유관기관 전용</div>
        </div>
      </div>

      {/* 관리자 버튼 */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-gray-700 text-white px-5 py-3 rounded-full flex items-center shadow-lg font-bold">
          <span className="mr-2">⚙️</span> 관리자
        </button>
      </div>
    </div>
  );
}
