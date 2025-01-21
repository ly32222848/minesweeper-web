import Minesweeper from '@/components/Minesweeper'

import React from 'react';
import { Globe } from 'lucide-react';

const DirectoryHeader = () => {
  const tags = [
    { name: 'AI business tools', count: 15 },
    { name: 'AI image Transformer', count: 9 },
    { name: 'AI security tool', count: 2 },
    { name: 'AI education', count: 18 },
    { name: 'AI Tools for Entertainment', count: 31 },
    { name: 'AI detector', count: 5 },
    { name: 'AI Source', count: 6 },
    { name: 'AI Video Editor', count: 4 },
    { name: 'AI Productivity Tool', count: 47 },
    { name: 'AI avatar generators', count: 5 },
    { name: 'AI Reader', count: 1 },
    { name: 'AI Humanizers', count: 13 },
    { name: 'AI art tools', count: 9 },
    { name: 'AI animation', count: 21 },
  ];

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-orange-500">Woy.ai</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Discover AI
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Submit
              </a>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                <Globe className="w-5 h-5" />
                <span>EN</span>
              </button>
              <button className="w-8 h-8 bg-blue-600 rounded-full text-white flex items-center justify-center">
                L
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Woy AI Tools Directory
          </h1>
          <p className="text-xl text-gray-600">
            Discover the top AI tools of 2025 with the Woy.ai AI Directory!
          </p>
        </div>

        {/* Tags Section */}
        <div className="flex flex-wrap gap-3 justify-center">
          {tags.map((tag, index) => (
            <button
              key={index}
              className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <span className="text-gray-700">{tag.name}</span>
              <span className="ml-2 text-orange-500">({tag.count})</span>
            </button>
          ))}
          <button className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-gray-200 hover:border-gray-300 transition-colors">
            <span className="text-gray-700">More +</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DirectoryHeader;

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
