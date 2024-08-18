import React, { useState, useMemo } from 'react';
import { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, flexRender } from '@tanstack/react-table';
import { FaFilter, FaPlus } from 'react-icons/fa';
import { faker } from '@faker-js/faker';
import FilterDropdown from './FilterDropdown';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Pagination from './Pagination';
import EditMemberForm from './EditMemberForm';
import MemberDetailsPane from './MemberDetailsPane';
import { LuTrash2 } from "react-icons/lu";
import { FiEdit2 } from "react-icons/fi";
import { ImSearch } from "react-icons/im";
import { useSearchParams } from 'react-router-dom';

const roles = [
  'Product Designer', 'Product Manager', 'Frontend Developer', 'Backend Developer',
  'UI Designer', 'Wordpress Developer', 'Software Engineer', 'UX Designer',
  'UX Copywriter', 'QA Engineer', 'Fullstack Developer'
];

const teams = ['Design', 'Product', 'Marketing', 'Technology', 'Finance'];

const generateData = () => {
  return Array.from({ length: 100 }, () => {
    const fullName = faker.person.fullName().replace(/(Mr|Miss|Mrs|Ms|Dr)\s*\.?\s*/, '');
    const firstName = fullName.split(' ')[0].toLowerCase();
    const profilePicture = faker.image.avatar();
    return {
      id: faker.string.uuid(),
      name: fullName,
      username: `@${firstName}`,
      status: 'Active',
      role: roles[Math.floor(Math.random() * roles.length)],
      email: `${fullName.toLowerCase().replace(/\s/g, '')}${Math.floor(Math.random() * 90 + 10)}@${['gmail.com', 'yahoo.com', 'hotmail.com', 'google.com'][Math.floor(Math.random() * 4)]}`,
      teams: Array.from({ length: Math.floor(Math.random() * 3) + 2 }, () => teams[Math.floor(Math.random() * teams.length)]),
      profilePicture,
    };
  });
};

const PeopleTable = () => {
  const [data, setData] = useState(generateData());
  const [globalFilter, setGlobalFilter] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [editingMember, setEditingMember] = useState(null);
  const [showAddMember, setShowAddMember] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => (
          <div className="flex items-center mx-1">
            <img src={row.original.profilePicture} alt="Profile" className="w-10 h-10 rounded-full mr-3" />
            <div>
              <div className="font-semibold">{row.original.name}</div>
              <div className="text-sm text-gray-500">{row.original.username}</div>
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ value }) => (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-white border text-green-800">
            <span className="w-2 h-2 mr-1.5 bg-green-500 rounded-full"></span>
            <p>Active</p>
            {value}
          </span>
        ),
      },
      { accessorKey: 'role', header: 'Role' },
      { accessorKey: 'email', header: 'Email Address' },
      {
        accessorKey: 'teams',
        header: 'Teams',
        cell: ({ row }) => {
          const teams = row.getValue('teams');
          if (!Array.isArray(teams) || teams.length === 0) return null;

          const uniqueTeams = new Set(teams);

          return (
            <div className="flex flex-wrap">
              {Array.from(uniqueTeams).slice(0, 3).map((team, index) => (
                <span
                  key={index}
                  className={`rounded-full px-2 py-1 text-xs font-semibold mr-2 ${
                    team === 'Design'
                      ? 'bg-blue-200 text-blue-800'
                      : team === 'Product'
                      ? 'bg-green-200 text-green-800'
                      : team === 'Technology'
                      ? 'bg-red-200 text-red-800'
                      : team === 'Marketing'
                      ? 'bg-yellow-200 text-yellow-800'
                      : 'bg-purple-200 text-purple-800'
                  }`}
                >
                  {team}
                </span>
              ))}
              {uniqueTeams.size > 3 && (
                <span className="rounded-full px-2 py-1 text-xs font-semibold mr-2 bg-gray-200 text-gray-800">
                  +{uniqueTeams.size - 3}
                </span>
              )}
            </div>
          );
        },
      },
      {
        id: 'actions',
        cell: ({ row }) => (
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => handleDeleteMember(row.original)}
              className="text-gray-500 hover:text-red-700"
            >
              <LuTrash2 className='text-2xl mr-4'/>
            </button>
            <button
              onClick={() => setEditingMember(row.original)}
              className="text-gray-500 hover:text-blue-700"
            >
              <FiEdit2 className='text-2xl mr-4' />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleDeleteMember = (member) => {
    if (window.confirm(`Are you sure you want to delete ${member.name}?`)) {
      setData(data.filter((item) => item.id !== member.id));
    }
  };

  const handleAddMember = (newMember) => {
    setData([...data, { ...newMember, id: faker.datatype.uuid(), username: `@${newMember.name.split(' ')[0].toLowerCase()}` }]);
    setShowAddMember(false);
  };

  const handleEditMember = (editedMember) => {
    setData(data.map((item) => (item.id === editedMember.id ? { ...item, ...editedMember } : item)));
    setEditingMember(null);
  };

  const handleApplyFilters = (filters) => {
    setData(generateData().filter((item) => {
      return (
        (!filters.roles.length || filters.roles.includes(item.role)) &&
        (!filters.teams.length || item.teams.some((team) => filters.teams.includes(team)))
      );
    }));
    setShowFilter(false);
  };

  React.useEffect(() => {
    if (globalFilter) {
      setSearchParams({ query: globalFilter });
    } else {
      setSearchParams({});
    }
  }, [globalFilter, setSearchParams]);

  return (
    <main className="flex-1 p-6 relative" style={{ height: 'calc(100vh - var(--navbar-height))' }}>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-full pt-4 pb-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold mr-4 pl-6">Team Members</h2>
            <span className="bg-purple-100 text-purple-800 text-sm font-semibold px-2.5 py-0.5 rounded-full">
              {data.length} users
            </span>
          </div>
          <div className="flex items-center">
            <div className="relative mr-4">
              <input
                type="text"
                value={globalFilter || ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Search"
                className="border border-gray-300 rounded-md px-4 py-2 pl-4 pr-3 w-80"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-purple-700">
                <ImSearch />
              </div>
            </div>
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="bg-white text-gray-500 hover:text-gray-700 rounded-md p-2 mr-2"
            >
              <FaFilter />
            </button>
            <button
              onClick={() => setShowAddMember(true)}
              className="bg-purple-600 text-white hover:bg-purple-700 rounded-md px-4 py-2 mr-4 flex items-center"
            >
              <FaPlus className="mr-2" />
              ADD MEMBER
            </button>
          </div>
        </div>
        {showFilter && (
          <FilterDropdown
            roles={roles}
            teams={teams}
            onApplyFilters={handleApplyFilters}
          />
        )}
        <table className="w-full">
          <TableHeader headerGroups={table.getHeaderGroups()} />
          <TableBody
            rows={table.getRowModel().rows.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
            )}
            onRowClick={setSelectedMember}
          />
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(table.getRowModel().rows.length / itemsPerPage)}
          onPageChange={setCurrentPage}
        />
        {(editingMember || showAddMember) && (
          <EditMemberForm
            member={editingMember}
            onSave={editingMember ? handleEditMember : handleAddMember}
            onClose={() => {
              setEditingMember(null);
              setShowAddMember(false);
            }}
          />
        )}
      </div>
      {selectedMember && (
        <MemberDetailsPane
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </main>
  );
};

export default PeopleTable;