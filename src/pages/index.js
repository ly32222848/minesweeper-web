import Minesweeper from '@/components/Minesweeper'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">扫雷游戏</h1>
        </div>
      </nav>

      <main className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">开始游戏</h2>
          </div>

          <div className="flex justify-center">
            <Minesweeper />
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">游戏规则</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>左键点击揭示格子</li>
              <li>右键点击标记地雷</li>
              <li>数字表示周围八个格子中地雷的数量</li>
              <li>找出所有非地雷格子即可获胜</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 扫雷游戏. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
