import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import ProjectCard from '../../components/ui/ProjectCard';
import SkillBadge from '../../components/ui/SkillBadge';
import { useFeaturedProjects } from '../../hooks/useProjects';
import { useSkills } from '../../hooks/useSkills';

const HomePage: React.FC = () => {
  const { data: featuredProjects, isLoading: projectsLoading } = useFeaturedProjects();
  const { data: skills, isLoading: skillsLoading } = useSkills();

  const previewSkills = skills?.slice(0, 6) ?? [];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-primary-900 py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-900/20 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-primary-100 mb-4">
            Bonjour, je suis{' '}
            <span className="text-accent-400">Maxence</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-300 mb-4">
            Développeur Full Stack
          </p>
          <p className="text-primary-400 text-lg max-w-2xl mx-auto mb-10">
            Passionné par la création d'applications web modernes et performantes.
            Je combine design élégant et code propre pour construire des expériences utilisateur exceptionnelles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/projects"
              className="inline-flex items-center justify-center px-8 py-3 bg-accent-600 hover:bg-accent-700 text-white font-semibold rounded-lg transition-colors"
            >
              Voir mes projets
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-accent-500 text-accent-400 hover:bg-accent-500 hover:text-white font-semibold rounded-lg transition-colors"
            >
              Me contacter
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4 bg-primary-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-primary-100">Projets à la une</h2>
              <p className="text-primary-400 mt-2">Mes réalisations les plus marquantes</p>
            </div>
            <Link to="/projects" className="text-accent-400 hover:text-accent-300 font-medium text-sm">
              Tous les projets &rarr;
            </Link>
          </div>

          {projectsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
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
          ) : featuredProjects && featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-primary-400">Aucun projet à afficher pour le moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Skills Preview */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-primary-100">Compétences</h2>
              <p className="text-primary-400 mt-2">Mes technologies de prédilection</p>
            </div>
            <Link to="/skills" className="text-accent-400 hover:text-accent-300 font-medium text-sm">
              Toutes les compétences &rarr;
            </Link>
          </div>

          {skillsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="card animate-pulse p-4">
                  <div className="h-4 bg-primary-700 rounded w-1/2 mb-3" />
                  <div className="h-2 bg-primary-700 rounded w-full" />
                </div>
              ))}
            </div>
          ) : previewSkills.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {previewSkills.map((skill) => (
                <SkillBadge key={skill._id} skill={skill} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-primary-400">Aucune compétence à afficher pour le moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4 bg-primary-800/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary-100 mb-4">
            Travaillons ensemble
          </h2>
          <p className="text-primary-400 text-lg mb-8">
            Vous avez un projet en tête ? Je suis disponible pour de nouvelles opportunités.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-accent-600 hover:bg-accent-700 text-white font-semibold rounded-lg transition-colors"
          >
            Prendre contact
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
