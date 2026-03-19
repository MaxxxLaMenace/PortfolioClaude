import React from 'react';
import { Skill } from '../../types';

interface SkillBadgeProps {
  skill: Skill;
}

const getLevelLabel = (level: number): string => {
  if (level >= 90) return 'Expert';
  if (level >= 70) return 'Avancé';
  if (level >= 50) return 'Intermédiaire';
  if (level >= 30) return 'Débutant';
  return 'Novice';
};

const getLevelColor = (level: number): string => {
  if (level >= 90) return 'bg-green-500';
  if (level >= 70) return 'bg-accent-500';
  if (level >= 50) return 'bg-yellow-500';
  if (level >= 30) return 'bg-orange-500';
  return 'bg-red-500';
};

const SkillBadge: React.FC<SkillBadgeProps> = ({ skill }) => {
  return (
    <div className="bg-primary-800 border border-primary-700 rounded-lg p-4 hover:border-accent-600 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {skill.icon && (
            <span className="text-xl" aria-hidden="true">{skill.icon}</span>
          )}
          <span className="font-medium text-primary-100">{skill.name}</span>
        </div>
        <span className="text-xs text-primary-400">{getLevelLabel(skill.level)}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-primary-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${getLevelColor(skill.level)}`}
          style={{ width: `${skill.level}%` }}
          role="progressbar"
          aria-valuenow={skill.level}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${skill.name}: ${skill.level}%`}
        />
      </div>
      <div className="mt-1 text-right text-xs text-primary-500">{skill.level}%</div>
    </div>
  );
};

export default SkillBadge;
