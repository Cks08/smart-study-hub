import React, { useState } from 'react';
import { useStudy } from '../../context/StudyContext';
import { FormulaItem, SubjectId } from '../../types';
import { Zap, Copy, Check, Plus, Search } from 'lucide-react';

interface FormulaSheetSectionProps {
  subjectId: SubjectId;
}

export const FormulaSheetSection: React.FC<FormulaSheetSectionProps> = ({ subjectId }) => {
  const { formulas, addFormula } = useStudy();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // New formula form
  const [title, setTitle] = useState('');
  const [formula, setFormula] = useState('');
  const [explanation, setExplanation] = useState('');
  const [variables, setVariables] = useState('');
  const [category, setCategory] = useState('Core Formulas');

  const subjectFormulas = formulas.filter(f => f.subjectId === subjectId);

  const filtered = subjectFormulas.filter(f => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        f.title.toLowerCase().includes(q) ||
        f.formula.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q) ||
        f.explanation.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !formula.trim()) return;
    addFormula({
      subjectId,
      title: title.trim(),
      formula: formula.trim(),
      explanation: explanation.trim(),
      variables: variables.trim(),
      category: category.trim() || 'Formulas'
    });
    setTitle('');
    setFormula('');
    setExplanation('');
    setVariables('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search formulas, theorems, variables..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <button
          onClick={() => setShowAddForm(prev => !prev)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Formula</span>
        </button>
      </div>

      {/* Add Formula Form */}
      {showAddForm && (
        <form
          onSubmit={handleAddSubmit}
          className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-3"
        >
          <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Add New Formula / Equation Card
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Formula Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Barkhausen Criterion / Second-Order ts"
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={e => setCategory(e.target.value)}
                placeholder="e.g. Oscillators, Matrices, Concurrency"
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Formula Expression *</label>
            <input
              type="text"
              required
              value={formula}
              onChange={e => setFormula(e.target.value)}
              placeholder="e.g. f0 = 1 / (2 * pi * R * C)"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-amber-300 font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Explanation</label>
              <input
                type="text"
                value={explanation}
                onChange={e => setExplanation(e.target.value)}
                placeholder="Brief explanation for quick recall"
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Variables Legend</label>
              <input
                type="text"
                value={variables}
                onChange={e => setVariables(e.target.value)}
                placeholder="R in Ohms, C in Farads"
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-xs text-slate-400 hover:text-white px-3 py-1.5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-xs font-semibold px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg"
            >
              Save Formula
            </button>
          </div>
        </form>
      )}

      {/* Formula Cards Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-8 space-y-2">
          <Zap className="w-8 h-8 text-slate-600 mx-auto" />
          <h4 className="text-sm font-semibold text-slate-300">No formulas added</h4>
          <p className="text-xs text-slate-500">Add high-frequency formulas to revise quickly before stepping into the exam hall.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(item => (
            <div
              key={item.id}
              className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-1.5">{item.title}</h3>
                  </div>

                  <button
                    onClick={() => handleCopy(item.id, item.formula)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy formula"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* The Formula Box */}
                <div className="my-3 p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                  <span className="font-mono text-base font-bold text-amber-300 tracking-wide text-center overflow-x-auto">
                    {item.formula}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-2">
                  {item.explanation}
                </p>
              </div>

              {item.variables && (
                <div className="pt-2.5 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono">
                  <span className="text-slate-400">Where: </span>
                  {item.variables}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
