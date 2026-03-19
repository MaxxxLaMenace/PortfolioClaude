import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { useProject } from '../../hooks/useProjects';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading, error } = useProject(id ?? '');

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-primary-700 rounded w-1/2" />
            <div className="h-64 bg-primary-700 rounded-xl" />
            <div className="space-y-3">
              <div className="h-4 bg-primary-700 rounded w-full" />
              <div className="h-4 bg-primary-700 rounded w-5/6" />
              <div className="h-4 bg-primary-700 rounded w-4/6" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !project) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-primary-100 mb-4">Projet introuvable</h1>
          <p className="text-primary-400 mb-8">Ce projet n'existe pas ou a été supprimé.</p>
          <Link to="/projects" className="text-accent-400 hover:text-accent-300">
            &larr; Retour aux projets
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Back link */}
        <Link to="/projects" className="text-accent-400 hover:text-accent-300 text-sm mb-6 inline-block">
          &larr; Retour aux projets
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-primary-100 mb-2">{project.title}</h1>
              {project.category && (
                <span className="text-sm bg-primary-700 text-primary-300 px-3 py-1 rounded-full">
                  {project.category}
                </span>
              )}
            </div>
            <div className="flex gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-700 hover:bg-primary-600 text-primary-100 rounded-lg transition-colors text-sm"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-lg transition-colors text-sm"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Demo live
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Main image */}
        {project.imageUrl && (
          <div className="mb-8 rounded-xl overflow-hidden border border-primary-700">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-72 object-cover"
            />
          </div>
        )}

        {/* Description */}
        <div className="mb-8">
          <p className="text-primary-300 text-lg leading-relaxed">{project.description}</p>
          {project.longDescription && (
            <div className="mt-6 prose prose-invert max-w-none">
              <p className="text-primary-400 leading-relaxed whitespace-pre-line">{project.longDescription}</p>
            </div>
          )}
        </div>

        {/* Technologies */}
        {project.technologies.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-primary-100 mb-4">Technologies utilisées</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-accent-900/50 text-accent-300 border border-accent-800 px-3 py-1.5 rounded-lg text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Additional images */}
        {project.images.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-primary-100 mb-4">Images</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.map((img, index) => (
                <div key={index} className="rounded-lg overflow-hidden border border-primary-700">
                  <img src={img} alt={`${project.title} - image ${index + 1}`} className="w-full h-48 object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProjectDetailPage;
