import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { GrPowerReset } from 'react-icons/gr';

const FilterDropdown = ({ roles, teams, onApplyFilters }) => {
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [expandedFilter, setExpandedFilter] = useState(null);

  const handleFilterChange = (filter, value) => {
    if (filter === 'roles') {
      setSelectedRoles(value);
    } else if (filter === 'teams') {
      setSelectedTeams(value);
    }
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      roles: selectedRoles,
      teams: selectedTeams,
    });
  };

  const handleResetFilters = () => {
    setSelectedRoles([]);
    setSelectedTeams([]);
    onApplyFilters({ roles: [], teams: [] }); // Show all users again
  };

  const isSelectButtonDisabled = selectedRoles.length === 0 && selectedTeams.length === 0;

  return (
    <div className="relative">
      <div
        className="absolute right-0 mt-2 bg-white rounded-md shadow-lg p-4 w-64 z-50"
        style={{ top: '100%', right: 0 }}
      >
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3 className="text-lg font-semibold">Filters</h3>
          <button onClick={handleResetFilters} className="text-gray-600 hover:text-gray-900">
            <GrPowerReset size={18} />
          </button>
        </div>
        <div className="mb-4">
          <div
            className="flex items-center justify-between cursor-pointer mb-2"
            onClick={() => setExpandedFilter(expandedFilter === 'roles' ? null : 'roles')}
          >
            <label className="font-semibold">Roles</label>
            {expandedFilter === 'roles' ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {expandedFilter === 'roles' && (
            <div className="ml-4">
              {roles.map((role) => (
                <div key={role} className="flex items-center mb-1">
                  <input
                    type="checkbox"
                    id={role}
                    className="mr-2"
                    checked={selectedRoles.includes(role)}
                    onChange={(e) =>
                      handleFilterChange(
                        'roles',
                        e.target.checked
                          ? [...selectedRoles, role]
                          : selectedRoles.filter((r) => r !== role)
                      )
                    }
                  />
                  <label htmlFor={role}>{role}</label>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mb-4">
          <div
            className="flex items-center justify-between cursor-pointer mb-2"
            onClick={() => setExpandedFilter(expandedFilter === 'teams' ? null : 'teams')}
          >
            <label className="font-semibold">Teams</label>
            {expandedFilter === 'teams' ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {expandedFilter === 'teams' && (
            <div className="ml-4">
              {teams.map((team) => (
                <div key={team} className="flex items-center mb-1">
                  <input
                    type="checkbox"
                    id={team}
                    className="mr-2"
                    checked={selectedTeams.includes(team)}
                    onChange={(e) =>
                      handleFilterChange(
                        'teams',
                        e.target.checked
                          ? [...selectedTeams, team]
                          : selectedTeams.filter((t) => t !== team)
                      )
                    }
                  />
                  <label htmlFor={team}>{team}</label>
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={handleApplyFilters}
          className={`w-full ${
            isSelectButtonDisabled ? 'bg-gray-400' : 'bg-purple-600'
          } text-white hover:bg-purple-700 rounded-md px-4 py-2 ${
            isSelectButtonDisabled ? 'cursor-not-allowed' : ''
          }`}
          disabled={isSelectButtonDisabled}
        >
          Select
        </button>
      </div>
    </div>
  );
};

export default FilterDropdown;
