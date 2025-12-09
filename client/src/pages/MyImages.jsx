import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { motion } from "motion/react"

const MyImages = () => {
    const { backendUrl, token } = useContext(AppContext)
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('desc')

    const fetchImages = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`${backendUrl}/api/image/user-images`, {
                params: { page, search, sort },
                headers: { Authorization: `Bearer ${token}` }
            })

            if (data.success) {
                setImages(data.images)
                setTotalPages(data.totalPages)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (token) {
            fetchImages()
        }
    }, [token, page, search, sort])

    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='flex flex-col items-center min-h-[90vh] p-4 pb-20'>

            <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>My Creations</h1>
            <p className='text-gray-500 mb-8'>Browse your generated images</p>

            {/* Controls */}
            <div className='flex flex-wrap gap-4 w-full max-w-4xl mb-8 justify-between'>
                <input
                    type="text"
                    placeholder="Search prompts..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                    className='border border-gray-300 rounded-full px-4 py-2 w-full sm:w-auto flex-1 outline-none focus:border-blue-500'
                />
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className='border border-gray-300 rounded-full px-4 py-2 outline-none focus:border-blue-500'
                >
                    <option value="desc">Newest First</option>
                    <option value="asc">Oldest First</option>
                </select>
            </div>

            {/* Grid */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl'>
                    {images.map((img) => (
                        <div key={img._id} className='group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all'>
                            <img src={img.imageData} alt={img.prompt} className='w-full h-64 object-cover' />
                            <div className='absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
                                <p className='text-sm line-clamp-2'>{img.prompt}</p>
                                <p className='text-xs text-gray-300 mt-1'>{new Date(img.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className='flex gap-2 mt-10'>
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className='px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50'
                    >
                        Prev
                    </button>
                    <span className='px-4 py-2'>Page {page} of {totalPages}</span>
                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className='px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50'
                    >
                        Next
                    </button>
                </div>
            )}
        </motion.div>
    )
}

export default MyImages
