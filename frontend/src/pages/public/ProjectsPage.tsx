import React, { useState, useMemo } from 'react';
import Layout from '../../components/layout/Layout';
import ProjectCard from '../../components/ui/ProjectCard';
import { useProjects } from '../../hooks/useProjects';

const ProjectsPage: React.FC = () => {
  const { data: projects, isLoading, error } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => {
    if (!projects) return [];
    const cats = Array.from(new Set(projects.map((p) => p.category).filter(Boolean)));
    return cats;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    if (selectedCategory === 'all') return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [projects, selectedCategory]);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-primary-100 mb-3">Projets</h1>
          <p className="text-primary-400 text-lg">
            L'ensemble de mes réalisations et projets personnels
          </p>
        </div>

        {/* Category filter */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-accent-600 text-white'
                  : 'bg-primary-700 text-primary-300 hover:bg-primary-600'
              }`}
            >
              Tous
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-accent-600 text-white'
                    : 'bg-primary-700 text-primary-300 hover:bg-primary-600'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        )}

        {/* Projects grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-48 bg-primary-700" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-primary-700 rounded w-3/4" />
                  <div className="h-3 bg-primary-700 rounded w-full" />
                  <div className="h-3 bg-primary-700 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-red-400 text-lg">Erreur lors du chargement des projets.</p>
          </div>
        ) : filteredProjects.length > 0 ? (
          <>
            <p className="text-primary-500 text-sm mb-4">{filteredProjects.length} projet(s)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-primary-400 text-lg">Aucun projet dans cette catégorie.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProjectsPage;
