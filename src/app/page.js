'use client'

import axios from '@/lib/axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const Home = () => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showCards, setShowCards] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:3000/api/cards',
                )
                setItems(response.data)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) {
        return <div className="text-center">Loading...</div>
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen font-extrabold text-3xl text-red-500">
                Error: {error.message}
            </div>
        )
    }
    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const handleToggleCards = () => {
        setShowCards(!showCards)
    }
    const handleSearch = e => {
        setSearchQuery(e.target.value)
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <div className="container max-w-7xl mx-auto p-4">
                <div className="text-center mb-4">
                    <h1 className="text-4xl font-bold mb-4">Main Title</h1>
                    <h2 className="text-2xl mb-4">Subtitle</h2>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleToggleCards}>
                        {showCards ? 'Hide Cards' : 'Show Cards'}
                    </button>
                </div>
                <input
                    type="search"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search"
                    className="w-full my-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {showCards && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredItems.map(item => (
                            <div
                                key={item.id}
                                className="bg-white rounded shadow-md p-4">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={150}
                                    height={300}
                                    className="w-full h-48 object-cover mb-4"
                                />
                                <h2 className="text-lg font-bold">
                                    {item.title}
                                </h2>
                                <p className="text-gray-600">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home
