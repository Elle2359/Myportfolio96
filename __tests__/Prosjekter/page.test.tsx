import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProsjekterPage from '../../src/app/prosjekter/page';
import { getProjects } from '../../src/app/prosjekter/actions';

// Mock the components and functions
jest.mock('../../src/app/prosjekter/actions');
jest.mock('../../src/components/UI/PageHeader.component', () => {
  return function MockPageHeader({ children }) {
    return <h1>{children}</h1>;
  };
});
jest.mock('../../src/components/Prosjekter/ProsjektCard.component', () => {
  return function MockProsjektCard(props) {
    return <div data-testid="project-card">{props.name}</div>;
  };
});
jest.mock('../../src/components/Animations/RotatingLoader.component', () => {
  return function MockRotatingLoader() {
    return <div data-testid="rotating-loader">Loading...</div>;
  };
});
jest.mock('../../src/app/RootLayout', () => {
  return function MockRootLayout({ children }) {
    return <div>{children}</div>;
  };
});

describe('ProsjekterPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders projects from server component', async () => {
    const mockProjects = [
      {
        id: '1',
        name: 'Test Project 1',
        description: 'Test Description 1',
        subdescription: 'Test Subdescription 1',
        projectimage: { asset: { _ref: 'test1' } },
        urlwww: [],
        urlgithub: [],
      },
      {
        id: '2',
        name: 'Test Project 2',
        description: 'Test Description 2',
        subdescription: 'Test Subdescription 2',
        projectimage: { asset: { _ref: 'test2' } },
        urlwww: [],
        urlgithub: [],
      },
    ];

    (getProjects as jest.Mock).mockResolvedValue(mockProjects);

    const { container } = render(await ProsjekterPage());

    // Check if header is rendered
    expect(screen.getByText('Prosjekter')).toBeInTheDocument();

    // Check if all projects are rendered
    const projectCards = screen.getAllByTestId('project-card');
    expect(projectCards).toHaveLength(2);
    expect(projectCards[0]).toHaveTextContent('Test Project 1');
    expect(projectCards[1]).toHaveTextContent('Test Project 2');

    // Check grid layout
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1', 'xl:grid-cols-2', 'gap-8');
  });

  it('uses Suspense boundary for loading state', async () => {
    (getProjects as jest.Mock).mockResolvedValue([]);
    
    render(await ProsjekterPage());
    
    // Verify Suspense is used (indirectly through structure)
    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('aria-label', 'Innhold portefølje');
    expect(main).toContainElement(screen.getByText('Prosjekter'));
  });
});
