import React, { useState } from 'react';
import { Plus, Filter, MessageCircle, ThumbsUp, ThumbsDown, MapPin, User, Clock } from 'lucide-react';
import { useNomad } from '../context/NomadContext';
import { Post } from '../context/NomadContext';

const FeedPage: React.FC = () => {
  const { state, dispatch } = useNomad();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [showPostForm, setShowPostForm] = useState(false);
  const [newPost, setNewPost] = useState({
    type: 'question' as const,
    title: '',
    content: '',
    tags: ''
  });

  // Mock data for demonstration
  const mockPosts: Post[] = [
    {
      id: '1',
      userId: 'user1',
      type: 'question',
      title: 'Looking for van ride to Port Barton tomorrow morning',
      content: 'Hi everyone! I need to get to Port Barton tomorrow morning. Anyone know of reliable van services or want to share a ride? Looking to leave around 8-9 AM.',
      location: 'El Nido, Philippines',
      tags: ['transport', 'port-barton', 'van-share'],
      createdAt: '2024-01-15T10:30:00Z',
      replies: [
        {
          id: 'reply1',
          userId: 'user2',
          content: 'I can help! There\'s a van leaving at 8:30 AM from the main square. Cost is 500 PHP. DM me if you want to join!',
          createdAt: '2024-01-15T11:00:00Z',
          helpful: true
        }
      ],
      upvotes: 5,
      downvotes: 0
    },
    {
      id: '2',
      userId: 'user3',
      type: 'offer',
      title: 'Sunrise hike guide available - Mount Batur, Bali',
      content: 'Experienced local guide offering sunrise hikes to Mount Batur. Includes pickup from Ubud, breakfast, and stunning views. 350K IDR per person.',
      location: 'Bali, Indonesia',
      tags: ['hiking', 'mount-batur', 'sunrise', 'guide'],
      createdAt: '2024-01-15T08:15:00Z',
      replies: [],
      upvotes: 12,
      downvotes: 1
    },
    {
      id: '3',
      userId: 'user4',
      type: 'request',
      title: 'Need help with Cambodia-Vietnam border crossing',
      content: 'Planning to cross from Siem Reap to Ho Chi Minh City next week. Anyone recently did this route? What documents do I need?',
      location: 'Siem Reap, Cambodia',
      tags: ['border-crossing', 'visa', 'cambodia', 'vietnam'],
      createdAt: '2024-01-15T06:45:00Z',
      replies: [
        {
          id: 'reply2',
          userId: 'user5',
          content: 'Just did this last week! You need a Vietnam e-visa (apply online), passport valid for 6+ months, and $25 USD for the border fee.',
          createdAt: '2024-01-15T07:20:00Z',
          helpful: true
        }
      ],
      upvotes: 8,
      downvotes: 0
    }
  ];

  const filters = [
    { id: 'all', label: 'All Posts' },
    { id: 'question', label: 'Questions' },
    { id: 'offer', label: 'Offers' },
    { id: 'request', label: 'Requests' },
    { id: 'review', label: 'Reviews' }
  ];

  const filteredPosts = selectedFilter === 'all' 
    ? mockPosts 
    : mockPosts.filter(post => post.type === selectedFilter);

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    const post: Post = {
      id: Date.now().toString(),
      userId: 'currentUser',
      type: newPost.type,
      title: newPost.title,
      content: newPost.content,
      location: state.currentLocation,
      tags: newPost.tags.split(',').map(tag => tag.trim()),
      createdAt: new Date().toISOString(),
      replies: [],
      upvotes: 0,
      downvotes: 0
    };
    
    dispatch({ type: 'ADD_POST', payload: post });
    setNewPost({ type: 'question', title: '', content: '', tags: '' });
    setShowPostForm(false);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'question': return 'bg-blue-100 text-blue-800';
      case 'offer': return 'bg-green-100 text-green-800';
      case 'request': return 'bg-orange-100 text-orange-800';
      case 'review': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'question': return '❓';
      case 'offer': return '💡';
      case 'request': return '🤝';
      case 'review': return '⭐';
      default: return '📝';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Travel Feed</h1>
          <p className="text-gray-600 mt-1">Connect with travelers in {state.currentLocation}</p>
        </div>
        <button
          onClick={() => setShowPostForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Post</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <Filter className="w-5 h-5 text-gray-500" />
        <div className="flex space-x-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedFilter === filter.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Post Form Modal */}
      {showPostForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Create New Post</h2>
            <form onSubmit={handleSubmitPost}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Post Type
                  </label>
                  <select
                    value={newPost.type}
                    onChange={(e) => setNewPost({ ...newPost, type: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="question">Question</option>
                    <option value="offer">Offer</option>
                    <option value="request">Request</option>
                    <option value="review">Review</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="What's your question or offer?"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Provide more details..."
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={newPost.tags}
                    onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="transport, hiking, food"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowPostForm(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Posts Feed */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {/* Post Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Traveler</div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span>{post.location}</span>
                    <Clock className="w-3 h-3" />
                    <span>{formatTimeAgo(post.createdAt)}</span>
                  </div>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(post.type)}`}>
                {getTypeIcon(post.type)} {post.type}
              </span>
            </div>

            {/* Post Content */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-700 mb-3">
                {post.content}
              </p>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">{post.upvotes}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-500 hover:text-red-600 transition-colors">
                  <ThumbsDown className="w-4 h-4" />
                  <span className="text-sm">{post.downvotes}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">{post.replies.length} replies</span>
                </button>
              </div>
            </div>

            {/* Replies */}
            {post.replies.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h4 className="font-medium text-gray-900 mb-3">Replies</h4>
                <div className="space-y-3">
                  {post.replies.map((reply) => (
                    <div key={reply.id} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                            <User className="w-3 h-3 text-gray-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">Traveler</span>
                        </div>
                        <span className="text-xs text-gray-500">{formatTimeAgo(reply.createdAt)}</span>
                      </div>
                      <p className="text-sm text-gray-700">{reply.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No posts found for this filter.</div>
          <button
            onClick={() => setShowPostForm(true)}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            Be the first to post!
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedPage; 