import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Image URLs
  const GENERAL_IMAGE = 'https://cdn.pixabay.com/photo/2025/11/10/14/29/autumn-9948180_1280.jpg';
  const STUDENT_IMAGE = 'https://www.shutterstock.com/image-vector/man-shirt-tie-businessman-avatar-600nw-548848999.jpg';

  // Clear existing data (optional - comment out if you want to keep existing data)
  await prisma.$transaction([
    prisma.btechStudent.deleteMany(),
    prisma.mtechStudent.deleteMany(),
    prisma.phdStudent.deleteMany(),
    prisma.labProject.deleteMany(),
    prisma.labCarouselImage.deleteMany(),
    prisma.labProfile.deleteMany(),
    prisma.computationalTool.deleteMany(),
    prisma.outreach.deleteMany(),
    prisma.bookChapter.deleteMany(),
    prisma.book.deleteMany(),
    prisma.patent.deleteMany(),
    prisma.editorial.deleteMany(),
    prisma.award.deleteMany(),
    prisma.researchInterest.deleteMany(),
    prisma.position.deleteMany(),
    prisma.education.deleteMany(),
    prisma.resumeProfile.deleteMany(),
    prisma.teachingCourse.deleteMany(),
    prisma.teachingDepartment.deleteMany(),
    prisma.researchPublication.deleteMany(),
    prisma.research.deleteMany(),
    prisma.news.deleteMany(),
    prisma.publication.deleteMany(),
    prisma.about.deleteMany(),
  ]);



  // Publications
  const publications = [
    {
      title: 'Machine Learning Approaches for Protein Structure Prediction',
      authors: 'Vibin Ramakrishnan, John Doe, Jane Smith',
      venue: 'Nature Computational Biology',
      year: 2024,
      doi: '10.1038/s41467-024-12345',
      publisher: 'Nature Publishing Group',
      order: 1,
      isVisible: true
    },
    {
      title: 'Deep Learning for Drug Discovery: A Comprehensive Review',
      authors: 'Vibin Ramakrishnan, Alice Johnson',
      venue: 'Journal of Chemical Information and Modeling',
      year: 2023,
      doi: '10.1021/acs.jcim.3c00123',
      publisher: 'American Chemical Society',
      order: 2,
      isVisible: true
    },
    {
      title: 'Systems Biology Approach to Understanding Cancer Metabolism',
      authors: 'Vibin Ramakrishnan, Bob Wilson, Carol Davis',
      venue: 'Cell Systems',
      year: 2023,
      doi: '10.1016/j.cels.2023.01.001',
      publisher: 'Elsevier',
      order: 3,
      isVisible: true
    },
    {
      title: 'Novel Computational Methods for Genomic Data Analysis',
      authors: 'Vibin Ramakrishnan, Emily Brown',
      venue: 'Bioinformatics',
      year: 2022,
      doi: '10.1093/bioinformatics/btac234',
      publisher: 'Oxford University Press',
      order: 4,
      isVisible: true
    },
    {
      title: 'Artificial Intelligence in Precision Medicine',
      authors: 'Vibin Ramakrishnan, Michael Chen, Sarah Lee',
      venue: 'Nature Medicine',
      year: 2022,
      doi: '10.1038/s41591-022-01789-1',
      publisher: 'Nature Publishing Group',
      order: 5,
      isVisible: true
    }
  ];

  for (const pub of publications) {
    await prisma.publication.create({ data: pub });
  }

  // News
  const newsItems = [
    {
      date: '2024-11-20',
      text: 'Paper accepted in Nature Computational Biology',
      link: 'https://nature.com',
      summary: 'Our latest work on machine learning for protein structure prediction has been accepted.',
      order: 1,
      isVisible: true
    },
    {
      date: '2024-10-15',
      text: 'Received Best Paper Award at ISCB Conference',
      link: 'https://iscb.org',
      summary: 'Our research on drug discovery using deep learning was recognized with the best paper award.',
      order: 2,
      isVisible: true
    },
    {
      date: '2024-09-01',
      text: 'New PhD students joined the lab',
      link: '#',
      summary: 'We welcome three new PhD students to our research group.',
      order: 3,
      isVisible: true
    },
    {
      date: '2024-08-10',
      text: 'Grant awarded by DST for AI in Healthcare project',
      link: 'https://dst.gov.in',
      summary: 'Received a major research grant for developing AI tools for precision medicine.',
      order: 4,
      isVisible: true
    }
  ];

  for (const news of newsItems) {
    await prisma.news.create({ data: news });
  }

  // Research Areas
  const researchAreas = [
    {
      title: 'Computational Biology',
      description: 'Development of computational methods for analyzing biological data, including sequence analysis, structure prediction, and systems modeling.',
      imageUrl: GENERAL_IMAGE,
      order: 1,
      isVisible: true
    },
    {
      title: 'Machine Learning for Drug Discovery',
      description: 'Application of deep learning and AI techniques for drug target identification, virtual screening, and drug-protein interaction prediction.',
      imageUrl: GENERAL_IMAGE,
      order: 2,
      isVisible: true
    },
    {
      title: 'Systems Biology',
      description: 'Integrative analysis of multi-omics data to understand complex biological systems and disease mechanisms.',
      imageUrl: GENERAL_IMAGE,
      order: 3,
      isVisible: true
    }
  ];

  for (const research of researchAreas) {
    const created = await prisma.research.create({ data: research });

    // Add publications for each research area
    await prisma.researchPublication.createMany({
      data: [
        {
          researchId: created.id,
          title: `Key Publication in ${research.title}`,
          authors: 'Vibin Ramakrishnan et al.',
          journal: 'Nature Biotechnology',
          year: 2024,
          doi: `10.1038/nbt.2024.${created.id}`,
          order: 1
        },
        {
          researchId: created.id,
          title: `Recent Advances in ${research.title}`,
          authors: 'Vibin Ramakrishnan, Collaborators',
          journal: 'Science',
          year: 2023,
          doi: `10.1126/science.2023.${created.id}`,
          order: 2
        }
      ]
    });
  }

  // Teaching Departments
  const departments = [
    {
      name: 'Biosciences and Bioengineering',
      color: 'emerald',
      order: 1,
      isVisible: true
    },
    {
      name: 'Computer Science and Engineering',
      color: 'blue',
      order: 2,
      isVisible: true
    }
  ];

  for (const dept of departments) {
    const created = await prisma.teachingDepartment.create({ data: dept });

    // Add courses for each department
    if (dept.name.includes('Biosciences')) {
      await prisma.teachingCourse.createMany({
        data: [
          {
            departmentId: created.id,
            courseCode: 'BT 205',
            courseName: 'Biophysics',
            courseType: 'Undergraduate',
            order: 1
          },
          {
            departmentId: created.id,
            courseCode: 'BT 601',
            courseName: 'Computational Biology',
            courseType: 'Graduate',
            order: 2
          },
          {
            departmentId: created.id,
            courseCode: 'BT 602',
            courseName: 'Systems Biology',
            courseType: 'Graduate',
            order: 3
          }
        ]
      });
    } else {
      await prisma.teachingCourse.createMany({
        data: [
          {
            departmentId: created.id,
            courseCode: 'CS 101',
            courseName: 'Introduction to Programming',
            courseType: 'Undergraduate',
            order: 1
          },
          {
            departmentId: created.id,
            courseCode: 'CS 561',
            courseName: 'Machine Learning',
            courseType: 'Graduate',
            order: 2
          }
        ]
      });
    }
  }

  // Resume Profile
  await prisma.resumeProfile.create({
    data: {
      name: 'Dr. Vibin Ramakrishnan',
      title: 'Professor',
      departments: 'Department of Biosciences and Bioengineering, IIT Guwahati',
      profileImage: STUDENT_IMAGE,
      email: 'vibin@iitg.ac.in',
      phone: '+91 361 258 2227',
      websiteUrl: 'https://www.iitg.ac.in/vibin',
      resumePDF: null
    }
  });

  // Education
  await prisma.education.createMany({
    data: [
      {
        degree: 'Ph.D.',
        field: 'Computational Biology',
        institution: 'Indian Institute of Technology Delhi',
        year: '2005 - 2010',
        order: 1
      },
      {
        degree: 'M.Tech.',
        field: 'Biotechnology',
        institution: 'Indian Institute of Technology Bombay',
        year: '2003 - 2005',
        order: 2
      },
      {
        degree: 'B.Tech.',
        field: 'Biotechnology',
        institution: 'Anna University',
        year: '1999 - 2003',
        order: 3
      }
    ]
  });

  // Positions
  await prisma.position.createMany({
    data: [
      {
        title: 'Professor',
        place: 'Department of BSBE, IIT Guwahati',
        years: '2020 - Present',
        order: 1
      },
      {
        title: 'Associate Professor',
        place: 'Department of BSBE, IIT Guwahati',
        years: '2015 - 2020',
        order: 2
      },
      {
        title: 'Assistant Professor',
        place: 'Department of BSBE, IIT Guwahati',
        years: '2010 - 2015',
        order: 3
      },
      {
        title: 'Postdoctoral Fellow',
        place: 'Stanford University, USA',
        years: '2008 - 2010',
        order: 4
      }
    ]
  });

  // Research Interests
  await prisma.researchInterest.createMany({
    data: [
      { interest: 'Computational Biology and Bioinformatics', order: 1 },
      { interest: 'Machine Learning for Drug Discovery', order: 2 },
      { interest: 'Systems Biology and Network Medicine', order: 3 },
      { interest: 'Protein Structure and Function Prediction', order: 4 },
      { interest: 'Genomics and Precision Medicine', order: 5 }
    ]
  });

  // Awards
  await prisma.award.createMany({
    data: [
      { title: 'INSA Young Scientist Award, 2022', order: 1 },
      { title: 'Best Teacher Award, IIT Guwahati, 2021', order: 2 },
      { title: 'DBT-Wellcome Trust India Alliance Fellowship, 2018', order: 3 },
      { title: 'SERB Early Career Research Award, 2016', order: 4 },
      { title: 'DST INSPIRE Faculty Award, 2012', order: 5 }
    ]
  });

  // Editorial Boards
  await prisma.editorial.createMany({
    data: [
      {
        journalTitle: 'Journal of Computational Biology',
        publisher: 'Mary Ann Liebert',
        since: '2020 onwards',
        impactFactor: '3.2',
        journalImage: GENERAL_IMAGE,
        order: 1
      },
      {
        journalTitle: 'Bioinformatics',
        publisher: 'Oxford University Press',
        since: '2019 onwards',
        impactFactor: '5.8',
        journalImage: GENERAL_IMAGE,
        order: 2
      }
    ]
  });

  // Patents
  await prisma.patent.createMany({
    data: [
      {
        title: 'Method and System for Protein Structure Prediction using Deep Learning',
        inventors: 'Vibin Ramakrishnan, Student A, Student B',
        patentNo: 'IN 202341012345',
        date: '15.06.2023',
        status: 'Published',
        patentType: 'Indian',
        order: 1
      },
      {
        title: 'AI-based Drug Discovery Platform',
        inventors: 'Vibin Ramakrishnan, Collaborator X',
        patentNo: 'US 2023/0123456',
        date: '20.03.2023',
        status: 'Filed',
        patentType: 'International',
        order: 2
      }
    ]
  });

  // Lab Profile
  await prisma.labProfile.create({
    data: {
      name: 'Dr. Vibin Ramakrishnan',
      title: 'Principal Investigator',
      photo: STUDENT_IMAGE,
      description: 'Leading research in computational biology and AI-driven drug discovery. Our lab focuses on developing innovative computational tools for biological data analysis.',
      email: 'vibin@iitg.ac.in',
      url: 'https://www.iitg.ac.in/vibin'
    }
  });

  // Lab Carousel Images
  await prisma.labCarouselImage.createMany({
    data: [
      { imageUrl: GENERAL_IMAGE, order: 1 },
      { imageUrl: GENERAL_IMAGE, order: 2 },
      { imageUrl: GENERAL_IMAGE, order: 3 }
    ]
  });

  // Lab Projects
  await prisma.labProject.createMany({
    data: [
      {
        title: 'AI-Driven Drug Discovery Platform',
        objective: 'Developing machine learning models for predicting drug-target interactions and virtual screening of compound libraries.',
        keywords: 'Drug Discovery, Deep Learning, Virtual Screening',
        imageUrl: GENERAL_IMAGE,
        order: 1,
        isVisible: true
      },
      {
        title: 'Network Medicine for Complex Diseases',
        objective: 'Understanding disease mechanisms using systems biology and network analysis approaches.',
        keywords: 'Systems Biology, Network Medicine, Disease Modeling',
        imageUrl: GENERAL_IMAGE,
        order: 2,
        isVisible: true
      },
      {
        title: 'Protein Structure Prediction using AlphaFold',
        objective: 'Implementing and improving deep learning models for accurate protein structure prediction.',
        keywords: 'Protein Structure, Deep Learning, AlphaFold',
        imageUrl: GENERAL_IMAGE,
        order: 3,
        isVisible: true
      }
    ]
  });

  // PhD Students
  await prisma.phdStudent.createMany({
    data: [
      {
        name: 'Rajesh Kumar',
        title: 'Senior Research Fellow',
        field: 'Computational Biology',
        photo: STUDENT_IMAGE,
        isAlumni: false,
        presentPosition: null,
        note: null,
        order: 1
      },
      {
        name: 'Priya Sharma',
        title: 'Junior Research Fellow',
        field: 'Bioinformatics',
        photo: STUDENT_IMAGE,
        isAlumni: false,
        presentPosition: null,
        note: null,
        order: 2
      },
      {
        name: 'Amit Patel',
        title: 'Research Scholar',
        field: 'Machine Learning',
        photo: STUDENT_IMAGE,
        isAlumni: false,
        presentPosition: null,
        note: '(Co-Supervisor: Prof. X)',
        order: 3
      },
      {
        name: 'Dr. Neha Singh',
        title: 'PhD (2023)',
        field: 'Drug Discovery',
        photo: STUDENT_IMAGE,
        isAlumni: true,
        presentPosition: 'Postdoctoral Fellow, MIT, USA',
        note: null,
        order: 4
      },
      {
        name: 'Dr. Suresh Reddy',
        title: 'PhD (2021)',
        field: 'Systems Biology',
        photo: STUDENT_IMAGE,
        isAlumni: true,
        presentPosition: 'Assistant Professor, NIT Trichy',
        note: null,
        order: 5
      }
    ]
  });

  // M.Tech Students
  await prisma.mtechStudent.createMany({
    data: [
      { name: 'Ankit Verma', branch: 'Biotechnology', order: 1 },
      { name: 'Sneha Gupta', branch: 'Biotechnology', order: 2 },
      { name: 'Vikram Singh', branch: 'Computational Biology', order: 3 }
    ]
  });

  // B.Tech Students
  await prisma.btechStudent.createMany({
    data: [
      { name: 'Rohit Sharma', branch: 'Biotechnology', order: 1 },
      { name: 'Kavya Krishnan', branch: 'Biotechnology', order: 2 },
      { name: 'Arjun Mehta', branch: 'Computer Science', order: 3 }
    ]
  });

  // Books
  await prisma.book.createMany({
    data: [
      {
        title: 'Computational Methods in Bioinformatics',
        authors: 'Vibin Ramakrishnan, Co-Author A',
        isbn: '978-3-16-148410-0',
        publisher: 'Springer',
        year: '2022',
        links: JSON.stringify([
          { label: 'Springer', url: 'https://springer.com' },
          { label: 'Amazon', url: 'https://amazon.in' }
        ]),
        order: 1
      }
    ]
  });

  // Book Chapters
  await prisma.bookChapter.createMany({
    data: [
      {
        title: 'Machine Learning Applications in Drug Discovery',
        authors: 'Vibin Ramakrishnan, Student X',
        bookTitle: 'Artificial Intelligence in Healthcare',
        publisher: 'Elsevier',
        year: '2023',
        isbn: '978-0-12-345678-9',
        doi: '10.1016/B978-0-12-345678-9.00001-X',
        refNumber: 1,
        order: 1
      },
      {
        title: 'Network Analysis in Systems Biology',
        authors: 'Vibin Ramakrishnan, Collaborator Y',
        bookTitle: 'Systems Biology: Methods and Protocols',
        publisher: 'Humana Press',
        year: '2022',
        isbn: '978-1-07-161234-5',
        doi: '10.1007/978-1-07-161234-5_12',
        refNumber: 12,
        order: 2
      }
    ]
  });

  // Computational Tools
  await prisma.computationalTool.createMany({
    data: [
      {
        title: 'ProtPredict: Protein Structure Prediction Tool',
        description: 'A deep learning-based tool for accurate protein structure prediction from sequence.',
        reference: 'Ramakrishnan V et al. (2024). ProtPredict: Deep learning for protein structure prediction. Bioinformatics, 40(5):789-796.',
        imageUrl: GENERAL_IMAGE,
        url: 'https://protpredict.iitg.ac.in',
        order: 1
      },
      {
        title: 'DrugDiscAI: AI-Driven Drug Discovery Platform',
        description: 'Machine learning platform for virtual screening and drug-target interaction prediction.',
        reference: 'Ramakrishnan V, Kumar R (2023). DrugDiscAI: An AI platform for drug discovery. J Chem Inf Model, 63(12):3456-3467.',
        imageUrl: GENERAL_IMAGE,
        url: 'https://drugdiscai.iitg.ac.in',
        order: 2
      },
      {
        title: 'NetMed: Network Medicine Analysis Suite',
        description: 'Comprehensive toolkit for network-based analysis of disease mechanisms.',
        reference: 'Ramakrishnan V et al. (2022). NetMed: A network medicine analysis suite. Nucleic Acids Res, 50(W1):W123-W129.',
        imageUrl: GENERAL_IMAGE,
        url: 'https://netmed.iitg.ac.in',
        order: 3
      }
    ]
  });

  // Outreach
  await prisma.outreach.createMany({
    data: [
      {
        title: 'Science Popularization Talks',
        description: 'Regular talks at schools and colleges to promote interest in computational biology and bioinformatics among students.',
        imageUrl: GENERAL_IMAGE,
        order: 1,
        isVisible: true
      },
      {
        title: 'Workshop on Bioinformatics',
        description: 'Organized annual workshops for training students and researchers in computational biology tools and techniques.',
        imageUrl: GENERAL_IMAGE,
        order: 2,
        isVisible: true
      },
      {
        title: 'Open Source Software Development',
        description: 'Contributing to open source bioinformatics tools and making them freely available to the research community.',
        imageUrl: GENERAL_IMAGE,
        order: 3,
        isVisible: true
      }
    ]
  });

  // Create Admin User
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.adminUser.upsert({
    where: { email: 'vibin@iitg.ac.in' },
    update: {},
    create: {
      email: 'vibin@iitg.ac.in',
      encryptedPassword: hashedPassword,
      role: 'admin'
    }
  });

  console.log('Seed completed successfully!');
  console.log('Admin credentials: admin@iitg.ac.in / admin123');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
