'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  User,
  ShieldCheck,
  Building2,
  Bookmark,
  ScanLine,
  BookOpen,
  PlusCircle,
  FileCheck,
  Users,
  BarChart3,
  CheckCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  SlidersHorizontal,
  Upload,
} from 'lucide-react'
import {
  EraBadge,
  LocationMarker,
  ArchiveTag,
  HeritageDivider,
  Ornament,
} from '@/components/ui/museum-primitives'
import { ArtifactCard } from '@/components/ui/artifact-card'
import { ALL_HERITAGE_ASSETS } from '@/services/heritage-service'
import type { UserRole } from '@/types/heritage'

export default function DashboardPage() {
  // Role state: 'explorer' | 'curator' | 'admin'
  const [activeRole, setActiveRole] = useState<UserRole>('explorer')

  // Curator New Asset Form State
  const [newAssetSubmitted, setNewAssetSubmitted] = useState(false)
  const [assetName, setAssetName] = useState('')
  const [assetCategory, setAssetCategory] = useState('monument')
  const [assetState, setAssetState] = useState('Rajasthan')

  return (
    <div className="min-h-screen pt-[var(--nav-height)] bg-[var(--bg-page)] pb-24">
      {/* ── Page Header ── */}
      <section className="texture-paper py-10 md:py-12 border-b border-[var(--border-light)] bg-[var(--bg-surface)]">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <HeritageDivider label="VIRASAT Control Portal" />
            <h1 className="font-display text-display-md text-[var(--text-primary)] mt-1">
              Role-Based Dashboard
            </h1>
            <p className="font-ui text-sm text-[var(--text-muted)] mt-1">
              Experience VIRASAT from the perspective of an Explorer, Content Curator, or Platform Admin.
            </p>
          </div>

          {/* Role Switcher Pills (for Hackathon Evaluators) */}
          <div className="flex items-center border border-[var(--border-main)] bg-[var(--bg-elevated)] p-1 shadow-heritage-sm">
            <button
              onClick={() => setActiveRole('explorer')}
              className={`px-4 py-2 font-ui text-xs font-semibold tracking-wider flex items-center gap-1.5 transition-colors ${
                activeRole === 'explorer'
                  ? 'bg-walnut-800 text-parchment-100'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <User className="w-3.5 h-3.5" /> Explorer (Public)
            </button>
            <button
              onClick={() => setActiveRole('curator')}
              className={`px-4 py-2 font-ui text-xs font-semibold tracking-wider flex items-center gap-1.5 transition-colors ${
                activeRole === 'curator'
                  ? 'bg-walnut-800 text-parchment-100'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-bronze-400" /> Curator (Content)
            </button>
            <button
              onClick={() => setActiveRole('admin')}
              className={`px-4 py-2 font-ui text-xs font-semibold tracking-wider flex items-center gap-1.5 transition-colors ${
                activeRole === 'admin'
                  ? 'bg-walnut-800 text-parchment-100'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-terracotta-500" /> Admin (Platform)
            </button>
          </div>
        </div>
      </section>

      {/* ── Role Workspace ── */}
      <main className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 mt-8">
        <AnimatePresence mode="wait">
          {/* ════════════════════════════════════════════════════════════════
             ROLE 1: EXPLORER VIEW
             ════════════════════════════════════════════════════════════════ */}
          {activeRole === 'explorer' && (
            <motion.div
              key="explorer"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col gap-8"
            >
              {/* Explorer Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Saved Collections', value: '4 Assets', icon: Bookmark },
                  { label: 'AI Scans Conducted', value: '12 Scans', icon: ScanLine },
                  { label: 'Stories Completed', value: '7 Stories', icon: BookOpen },
                  { label: 'Heritage Badge', value: 'Guardian Level 2', icon: ShieldCheck },
                ].map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div
                      key={stat.label}
                      className="bg-[var(--bg-elevated)] border border-[var(--border-light)] p-5 flex flex-col gap-1 shadow-heritage-xs"
                    >
                      <Icon className="w-5 h-5 text-bronze-500 mb-1" />
                      <span className="font-display text-xl text-[var(--text-primary)]">{stat.value}</span>
                      <span className="font-ui text-xs text-[var(--text-muted)]">{stat.label}</span>
                    </div>
                  )
                })}
              </div>

              {/* Saved Heritage Collection */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-3">
                  <h3 className="font-heading text-xl text-[var(--text-primary)]">My Saved Heritage Collection</h3>
                  <Link href="/explore" className="font-ui text-xs text-bronze-600 hover:underline">
                    Browse More Assets →
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {ALL_HERITAGE_ASSETS.slice(0, 4).map((asset) => (
                    <ArtifactCard key={asset.id} asset={asset} variant="museum" />
                  ))}
                </div>
              </div>

              {/* Recent AI Scan History */}
              <div className="bg-[var(--bg-elevated)] border border-[var(--border-light)] p-6 flex flex-col gap-4">
                <h3 className="font-heading text-lg text-[var(--text-primary)]">Recent AI Recognition Scans</h3>
                <div className="flex flex-col gap-3">
                  {[
                    { name: 'Kumbhalgarh Fort Rampart', date: '2 hours ago', confidence: '96.4%', category: 'Monument' },
                    { name: 'Chola Nataraja Bronze', date: 'Yesterday', confidence: '98.1%', category: 'Sculpture' },
                    { name: 'Ajanta Cave #1 Murals', date: '3 days ago', confidence: '94.8%', category: 'Architecture' },
                  ].map((scan) => (
                    <div
                      key={scan.name}
                      className="flex items-center justify-between p-3 bg-[var(--bg-surface)] border border-[var(--border-light)] font-ui text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <ScanLine className="w-4 h-4 text-bronze-500" />
                        <div>
                          <span className="font-semibold text-[var(--text-primary)] block">{scan.name}</span>
                          <span className="text-[var(--text-muted)]">{scan.category} · {scan.date}</span>
                        </div>
                      </div>
                      <span className="font-monument text-bronze-600 bg-bronze-500/10 px-2 py-1 border border-bronze-500/20">
                        {scan.confidence} MATCH
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ════════════════════════════════════════════════════════════════
             ROLE 2: CURATOR VIEW
             ════════════════════════════════════════════════════════════════ */}
          {activeRole === 'curator' && (
            <motion.div
              key="curator"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col gap-8"
            >
              {/* Curator Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Catalogued Assets', value: '8,340 Records', icon: Building2 },
                  { label: 'Pending Approvals', value: '3 Submissions', icon: Clock },
                  { label: 'AI Tag Accuracy', value: '98.4%', icon: CheckCircle },
                  { label: 'Active Curators', value: '14 Specialists', icon: Users },
                ].map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div
                      key={stat.label}
                      className="bg-[var(--bg-elevated)] border border-[var(--border-light)] p-5 flex flex-col gap-1 shadow-heritage-xs"
                    >
                      <Icon className="w-5 h-5 text-bronze-500 mb-1" />
                      <span className="font-display text-xl text-[var(--text-primary)]">{stat.value}</span>
                      <span className="font-ui text-xs text-[var(--text-muted)]">{stat.label}</span>
                    </div>
                  )
                })}
              </div>

              {/* Two Columns: New Asset Entry Form + Verification Queue */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Form: Add New Heritage Record */}
                <div className="bg-[var(--bg-elevated)] border border-[var(--border-light)] p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-2 border-b border-[var(--border-light)] pb-3">
                    <PlusCircle className="w-4 h-4 text-bronze-500" />
                    <span className="font-monument text-xs text-walnut-800 tracking-wider">
                      CATALOGUE NEW HERITAGE ASSET
                    </span>
                  </div>

                  {newAssetSubmitted ? (
                    <div className="p-6 bg-green-50/50 border border-green-800/30 text-green-900 flex flex-col items-center gap-2 text-center">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                      <p className="font-ui text-sm font-semibold">Heritage Asset Submitted to Archive</p>
                      <p className="font-ui text-xs text-green-800">Assigned record ID #ASI-2024-HER-892</p>
                      <button
                        onClick={() => setNewAssetSubmitted(false)}
                        className="btn-heritage-secondary text-xs mt-2"
                      >
                        Add Another Record
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        setNewAssetSubmitted(true)
                      }}
                      className="flex flex-col gap-3 font-ui text-xs"
                    >
                      <div>
                        <label className="text-museum-label block mb-1">Monument / Artefact Title</label>
                        <input
                          type="text"
                          required
                          value={assetName}
                          onChange={(e) => setAssetName(e.target.value)}
                          placeholder="e.g. Rani ki Vav Stepwell"
                          className="w-full p-2.5 bg-[var(--bg-page)] border border-[var(--border-main)] text-sm text-[var(--text-primary)] outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-museum-label block mb-1">Category</label>
                          <select
                            value={assetCategory}
                            onChange={(e) => setAssetCategory(e.target.value)}
                            className="w-full p-2.5 bg-[var(--bg-page)] border border-[var(--border-main)] text-xs text-[var(--text-primary)] outline-none"
                          >
                            <option value="monument">Monument</option>
                            <option value="artefact">Artefact</option>
                            <option value="sculpture">Sculpture</option>
                            <option value="tradition">Living Tradition</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-museum-label block mb-1">State / Region</label>
                          <input
                            type="text"
                            required
                            value={assetState}
                            onChange={(e) => setAssetState(e.target.value)}
                            className="w-full p-2.5 bg-[var(--bg-page)] border border-[var(--border-main)] text-xs text-[var(--text-primary)] outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-museum-label block mb-1">Photo Upload</label>
                        <div className="border border-dashed border-[var(--border-main)] p-4 text-center cursor-pointer bg-[var(--bg-page)] flex items-center justify-center gap-2 text-[var(--text-muted)]">
                          <Upload className="w-4 h-4" /> Drop image file here
                        </div>
                      </div>

                      <button type="submit" className="btn-heritage-accent py-2.5 text-xs mt-2">
                        Submit Record for Verification
                      </button>
                    </form>
                  )}
                </div>

                {/* Content Verification Queue */}
                <div className="bg-[var(--bg-elevated)] border border-[var(--border-light)] p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-2 border-b border-[var(--border-light)] pb-3">
                    <FileCheck className="w-4 h-4 text-bronze-500" />
                    <span className="font-monument text-xs text-walnut-800 tracking-wider">
                      CONTENT VERIFICATION QUEUE
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 font-ui text-xs">
                    {[
                      { title: 'Channapatna Wooden Toys', submittedBy: 'Curator Ramesh', date: 'Today', status: 'Pending Review' },
                      { title: 'Pattadakal Temple Complex', submittedBy: 'Explorer User #412', date: 'Yesterday', status: 'AI Pre-verified' },
                      { title: 'Kalamkari Textile Weave', submittedBy: 'Curator Priya', date: '2 days ago', status: 'Approved' },
                    ].map((item) => (
                      <div key={item.title} className="p-3 bg-[var(--bg-surface)] border border-[var(--border-light)] flex flex-col gap-1.5">
                        <div className="flex justify-between font-semibold text-[var(--text-primary)]">
                          <span>{item.title}</span>
                          <span className="text-bronze-600 font-mono">{item.status}</span>
                        </div>
                        <span className="text-[var(--text-muted)]">{item.submittedBy} · {item.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ════════════════════════════════════════════════════════════════
             ROLE 3: ADMIN VIEW
             ════════════════════════════════════════════════════════════════ */}
          {activeRole === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col gap-8"
            >
              {/* Admin Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Total Digital Records', value: '12,450 Records', icon: BarChart3 },
                  { label: 'Active Monthly Users', value: '45,200 Users', icon: Users },
                  { label: 'AI Inference Speed', value: '180ms Avg', icon: TrendingUp },
                  { label: 'Supabase RLS Status', value: 'Policies Active', icon: ShieldCheck },
                ].map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div
                      key={stat.label}
                      className="bg-[var(--bg-elevated)] border border-[var(--border-light)] p-5 flex flex-col gap-1 shadow-heritage-xs"
                    >
                      <Icon className="w-5 h-5 text-terracotta-500 mb-1" />
                      <span className="font-display text-xl text-[var(--text-primary)]">{stat.value}</span>
                      <span className="font-ui text-xs text-[var(--text-muted)]">{stat.label}</span>
                    </div>
                  )
                })}
              </div>

              {/* Platform Control & Access Rights Table */}
              <div className="bg-[var(--bg-elevated)] border border-[var(--border-light)] p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-3">
                  <span className="font-monument text-xs text-walnut-800 tracking-wider flex items-center gap-2">
                    <Users className="w-4 h-4 text-bronze-500" />
                    USER ROLE ACCESS CONTROL
                  </span>
                  <span className="font-ui text-xs text-[var(--text-muted)]">3 USERS LISTED</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-ui text-xs">
                    <thead>
                      <tr className="border-b border-[var(--border-light)] text-[var(--text-muted)] uppercase tracking-wider">
                        <th className="pb-2">User Name</th>
                        <th className="pb-2">Email</th>
                        <th className="pb-2">Assigned Role</th>
                        <th className="pb-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-light)]">
                      {[
                        { name: 'Ananya Sharma', email: 'ananya@heritage.gov.in', role: 'Curator' },
                        { name: 'Professor V. K. Shastri', email: 'shastri@asi.gov.in', role: 'Admin' },
                        { name: 'Rohit Verma', email: 'rohit@gmail.com', role: 'Explorer' },
                      ].map((u) => (
                        <tr key={u.email} className="hover:bg-[var(--bg-surface)]">
                          <td className="py-3 font-semibold text-[var(--text-primary)]">{u.name}</td>
                          <td className="py-3 text-[var(--text-muted)]">{u.email}</td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 bg-walnut-800 text-parchment-100 text-[0.65rem] font-mono">
                              {u.role}
                            </span>
                          </td>
                          <td className="py-3">
                            <button className="text-bronze-600 hover:underline">Edit Rights</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
