import { useState } from 'react'
import './App.css'

const templates = [
  {
    id: 'abc-learning',
    name: 'ABC Learning',
    icon: '🔤',
    gradient: 'linear-gradient(135deg, #e0e7ff 0%, #c7f9cc 100%)',
    tag: 'Letters made fun',
  },
  {
    id: 'numbers',
    name: 'Numbers',
    icon: '🔢',
    gradient: 'linear-gradient(135deg, #fff0c2 0%, #ffd6a5 100%)',
    tag: 'Count and discover',
  },
  {
    id: 'bedtime-story',
    name: 'Bedtime Story',
    icon: '🌙',
    gradient: 'linear-gradient(135deg, #ffe6f1 0%, #d9d6ff 100%)',
    tag: 'Dreamy and cozy',
  },
  {
    id: 'family-story',
    name: 'Family Story',
    icon: '🏡',
    gradient: 'linear-gradient(135deg, #fff0d6 0%, #ffd7d7 100%)',
    tag: 'Warm and personal',
  },
  {
    id: 'adventure-story',
    name: 'Adventure Story',
    icon: '🧭',
    gradient: 'linear-gradient(135deg, #d7f5ef 0%, #d9ecff 100%)',
    tag: 'Explore somewhere new',
  },
]

const initialBookData = {
  childName: 'Aarav',
  age: '5',
  favoriteThing: 'elephant',
  favoriteColor: 'blue',
  storyTitle: 'The Moonberry Tree',
  pageOne: 'Aarav woke up smiling and ready for a magical morning.',
  pageTwo: 'He met a friendly elephant who wanted to explore the garden.',
  pageThree: 'Together they found a glowing tree with moon-shaped berries.',
  pageFour: 'They shared the treasure and drifted into a peaceful bedtime dream.',
}

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0])
  const [bookData, setBookData] = useState(initialBookData)
  const [authMode, setAuthMode] = useState('login')
  const [authOpen, setAuthOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [authForm, setAuthForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setBookData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAuthFieldChange = (event) => {
    const { name, value } = event.target
    setAuthForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleAuthSubmit = (event) => {
    event.preventDefault()

    if (!authForm.email || !authForm.password) return

    const finalUserName = authMode === 'signup' ? authForm.name || 'Parent' : 'Parent'
    setUser({ name: finalUserName, email: authForm.email })
    setAuthOpen(false)
    setAuthForm({ name: '', email: '', password: '' })
  }

  const openAuth = (mode) => {
    setAuthMode(mode)
    setAuthOpen(true)
  }

  const printBook = () => {
    window.print()
  }

  const coverName = bookData.childName ? `${bookData.childName}'s Story` : 'My Story'

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">S</div>
          <span>StorySprout</span>
        </div>

        <nav className="main-nav">
          <a href="#templates">Templates</a>
          <a href="#builder">Book Builder</a>
          <a href="#why-us">Why Parents Love It</a>
        </nav>

        {user ? (
          <div className="user-chip-wrap">
            <span className="user-chip">Hi, {user.name}</span>
            <button type="button" className="nav-button" onClick={() => setUser(null)}>
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-actions">
            <button type="button" className="secondary-btn small-btn" onClick={() => openAuth('login')}>
              Login
            </button>
            <button type="button" className="nav-button" onClick={() => openAuth('signup')}>
              Start Free
            </button>
          </div>
        )}
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <span className="eyebrow">Personalized books for preschoolers</span>
            <h1>Create a custom storybook for your child in minutes.</h1>
            <p>
              Parents can build joyful, printable books with their child&apos;s name,
              favorite things, and learning moments. Perfect for pre-primary kids.
            </p>

            <div className="hero-actions">
              <button type="button" className="primary-btn" onClick={() => openAuth('signup')}>
                Create My Book
              </button>
              <a href="#templates" className="secondary-btn">See Templates</a>
            </div>

            <div className="mini-stats">
              <div>
                <strong>4.9/5</strong>
                <span>Parent rating</span>
              </div>
              <div>
                <strong>6 pages</strong>
                <span>Ready to print</span>
              </div>
              <div>
                <strong>3 mins</strong>
                <span>To create</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="book-stack">
              <div className="book-card main-book" style={{ background: selectedTemplate.gradient }}>
                <div className="book-spine" aria-hidden="true" />
                <div className="book-page-left" aria-hidden="true" />
                <div className="book-page-right" aria-hidden="true" />
                <span className="book-tag">{selectedTemplate.tag}</span>
                <h3>{coverName}</h3>
                <p>{bookData.storyTitle}</p>
              </div>
              <div className="book-card smoke-card">
                <span>My favorite thing</span>
                <strong>{bookData.favoriteThing}</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="feature-strip" id="why-us">
          <div>
            <span>✅</span>
            <p>Personalized for each child</p>
          </div>
          <div>
            <span>📚</span>
            <p>Pre-primary learning themes</p>
          </div>
          <div>
            <span>🖨️</span>
            <p>Print-ready and PDF friendly</p>
          </div>
        </section>

        <section className="templates-section" id="templates">
          <div className="section-heading">
            <span className="eyebrow">Choose a style</span>
            <h2>Start with a story template</h2>
          </div>

          <div className="template-grid">
            {templates.map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => setSelectedTemplate(template)}
                className={`template-card ${selectedTemplate.id === template.id ? 'active' : ''}`}
                style={{ background: template.gradient }}
                aria-pressed={selectedTemplate.id === template.id}
              >
                <span className="template-icon" aria-hidden="true">{template.icon}</span>
                <span>{template.name}</span>
                <small>{template.tag}</small>
              </button>
            ))}
          </div>
        </section>

        <section className="builder-section" id="builder">
          <div className="builder-panel">
            <div className="section-heading small">
              <span className="eyebrow">Book builder</span>
              <h2>Customize your book</h2>
            </div>

            <div className="form-grid">
              <label>
                Child name
                <input type="text" name="childName" value={bookData.childName} onChange={handleChange} />
              </label>

              <label>
                Age
                <input type="text" name="age" value={bookData.age} onChange={handleChange} />
              </label>

              <label>
                Favorite thing
                <input type="text" name="favoriteThing" value={bookData.favoriteThing} onChange={handleChange} />
              </label>

              <label>
                Favorite color
                <input type="text" name="favoriteColor" value={bookData.favoriteColor} onChange={handleChange} />
              </label>

              <label className="full-width">
                Book title
                <input type="text" name="storyTitle" value={bookData.storyTitle} onChange={handleChange} />
              </label>

              <label className="full-width">
                Page 1
                <textarea name="pageOne" value={bookData.pageOne} onChange={handleChange} rows="3" />
              </label>

              <label className="full-width">
                Page 2
                <textarea name="pageTwo" value={bookData.pageTwo} onChange={handleChange} rows="3" />
              </label>

              <label className="full-width">
                Page 3
                <textarea name="pageThree" value={bookData.pageThree} onChange={handleChange} rows="3" />
              </label>

              <label className="full-width">
                Page 4
                <textarea name="pageFour" value={bookData.pageFour} onChange={handleChange} rows="3" />
              </label>
            </div>

            <button type="button" className="print-btn" onClick={printBook}>
              Print Book
            </button>
          </div>

          <div className="preview-panel">
            <div className="preview-header">
              <span>Book preview</span>
              <button type="button" className="print-mini" onClick={printBook}>Print</button>
            </div>

            <div className="storybook-preview" style={{ background: selectedTemplate.gradient }}>
              <div className="book-visual">
                <div className="book-cover">
                  <div className="cover-inner">
                    <span className="preview-tag">{selectedTemplate.name}</span>
                    <h3>{bookData.storyTitle}</h3>
                    <p>
                      {bookData.childName} is {bookData.age} and loves {bookData.favoriteThing} in a {bookData.favoriteColor} world.
                    </p>
                  </div>
                </div>

                <div className="inside-page page-one">
                  <h4>Page 1</h4>
                  <p>{bookData.pageOne}</p>
                </div>

                <div className="inside-page page-two">
                  <h4>Page 2</h4>
                  <p>{bookData.pageTwo}</p>
                </div>

                <div className="inside-page page-three">
                  <h4>Page 3</h4>
                  <p>{bookData.pageThree}</p>
                </div>

                <div className="inside-page page-four">
                  <h4>Page 4</h4>
                  <p>{bookData.pageFour}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {authOpen && (
        <div className="auth-overlay" onClick={() => setAuthOpen(false)}>
          <div className="auth-modal" onClick={(event) => event.stopPropagation()}>
            <div className="auth-header">
              <div>
                <span className="eyebrow auth-eyebrow">Welcome</span>
                <h3>{authMode === 'login' ? 'Login to your account' : 'Create your account'}</h3>
              </div>
              <button type="button" className="close-btn" onClick={() => setAuthOpen(false)}>
                ×
              </button>
            </div>

            <form className="auth-form" onSubmit={handleAuthSubmit}>
              {authMode === 'signup' && (
                <label>
                  Full name
                  <input
                    type="text"
                    name="name"
                    value={authForm.name}
                    onChange={handleAuthFieldChange}
                    placeholder="Parent name"
                  />
                </label>
              )}

              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={authForm.email}
                  onChange={handleAuthFieldChange}
                  placeholder="you@example.com"
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  name="password"
                  value={authForm.password}
                  onChange={handleAuthFieldChange}
                  placeholder="Enter password"
                />
              </label>

              <button type="submit" className="auth-submit">
                {authMode === 'login' ? 'Login' : 'Sign Up'}
              </button>
            </form>

            <div className="auth-switch">
              <span>{authMode === 'login' ? 'Need an account?' : 'Already have an account?'}</span>
              <button type="button" onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}>
                {authMode === 'login' ? 'Sign up' : 'Login'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
