export const tasksTest = [
  {
    "task_name": "Identification des objectifs du projet",
    "description": "Collecte d'information, définition des objectifs généraux, identification des besoins spécifiques, réalisation de l'inventaire du matériel, identification des risques, détermination de la date prévisionnelle de mise en œuvre du réseau local.",
    "date_start": {
      "$date": "2023-12-01T00:00:00.000Z"
    },
    "duration": 10,
    "progress": 0,
    "parent": [],
    "_id": {
      "$oid": "65a1453b9f2c9370a135d9ce"
    }
  },
  {
    "task_name": "Planification",
    "description": "Une fois l’étape de définition des besoins terminée, une élaboration du budget et planification  est faite par un groupe d’analystes en collaboration avec le chef du projet.",
    "date_start": {
      "$date": "2023-12-11T00:00:00.000Z"
    },
    "duration": 5,
    "progress": 0,
    "parent": [
      {
        "$oid": "65a1453b9f2c9370a135d9ce"
      }
    ],
    "_id": {
      "$oid": "65a145ab9f2c9370a135d9d4"
    }
  },
  {
    "task_name": "Détermination du matériel requis et de la topologie réseau",
    "description": "Après approbation du planning, du budget et des délais et la clarification des enjeux techniques, vient la définition de la structure du réseau.",
    "date_start": {
      "$date": "2023-12-16T00:00:00.000Z"
    },
    "duration": 4,
    "progress": 0,
    "parent": [
      {
        "$oid": "65a145ab9f2c9370a135d9d4"
      }
    ],
    "_id": {
      "$oid": "65a145c89f2c9370a135d9db"
    }
  },
  {
    "task_name": "Etude et évaluation des solutions techniques",
    "description": "Il est essentiel de faire une description et une évaluation des solutions techniques du projet, sur la base de la topologie du réseau et du matériel requis, en fournissant les informations techniques qui doivent être prises en compte. (Exemples : Système d'exploitation : Windows, Unix, MacOs,...Ordinateur : station de travail, assistant personnel, ...Sécurité : Antivirus, firewall, etc.)",
    "date_start": {
      "$date": "2023-12-20T00:00:00.000Z"
    },
    "duration": 9,
    "progress": 0,
    "parent": [
      {
        "$oid": "65a145c89f2c9370a135d9db"
      }
    ],
    "_id": {
      "$oid": "65a145e29f2c9370a135d9e3"
    }
  },
  {
    "task_name": "Choix des fournisseurs",
    "description": "Une évaluation est faite par le département des achats afin de déterminer le ou les fournisseurs afin de satisfaire les besoins établis préalablement. Les spécifications techniques préétablies doivent se refléter dans les soumissions des fournisseurs.",
    "date_start": {
      "$date": "2023-12-29T00:00:00.000Z"
    },
    "duration": 5,
    "progress": 0,
    "parent": [
      {
        "$oid": "65a145e29f2c9370a135d9e3"
      }
    ],
    "_id": {
      "$oid": "65a145ff9f2c9370a135d9ec"
    }
  },
  {
    "task_name": "Achat du logiciel réseau",
    "description": "Une fois le choix des fournisseurs fixé, le département des achats se charge d’acquérir le logiciel réseau.",
    "date_start": {
      "$date": "2024-01-03T00:00:00.000Z"
    },
    "duration": 4,
    "progress": 0,
    "parent": [
      {
        "$oid": "65a145ff9f2c9370a135d9ec"
      }
    ],
    "_id": {
      "$oid": "65a146179f2c9370a135d9f6"
    }
  },
  {
    "task_name": "Formation des utilisateurs chez le fournisseur du logiciel réseau",
    "description": "La formation doit permettre l'acquisition des fonctionnalités essentielles du logiciel. Le responsable de formation aura à travailler en étroite relation avec le chef de projet.",
    "date_start": {
      "$date": "2024-01-07T00:00:00.000Z"
    },
    "duration": 5,
    "progress": 0,
    "parent": [
      {
        "$oid": "65a146179f2c9370a135d9f6"
      }
    ],
    "_id": {
      "$oid": "65a1462c9f2c9370a135da01"
    }
  },
  {
    "task_name": "Achat du matériel",
    "description": "Le département des achats se charge de l’achat des équipements en relation avec les usages prévus.",
    "date_start": {
      "$date": "2024-01-12T00:00:00.000Z"
    },
    "duration": 8,
    "progress": 0,
    "parent": [
      {
        "$oid": "65a1462c9f2c9370a135da01"
      }
    ],
    "_id": {
      "$oid": "65a146419f2c9370a135da0d"
    }
  },
  {
    "task_name": "Implantation physique",
    "description": "Avant la mise en place concrète du réseau, les techniciens réseau doivent s'assurer que tous les composants ont bien été livrés, et que ceux-ci correspondent aux spécifications qui ont été commandées. Par exemple, il faut vérifier le type, le nombre et la longueur du support de communication (câbles coaxial, en paires torsadées, en fibre optique,...), le type et le nombre de connecteurs (ou l'armoire de brassage), le nombre et la longueur des cordons de brassage, les types et le nombre des dispositifs de connectivité (répéteur, pont, routeur, passerelle, commutateur, modem,...), etc.",
    "date_start": {
      "$date": "2024-01-20T00:00:00.000Z"
    },
    "duration": 6,
    "progress": 0,
    "parent": [
      {
        "$oid": "65a146419f2c9370a135da0d"
      }
    ],
    "_id": {
      "$oid": "65a146579f2c9370a135da1a"
    }
  },
  {
    "task_name": "Installation physique du serveur et des postes clients",
    "description": "Après réception et test du matériel, l’administrateur réseau supervise les techniciens lors de l’installation physique du réseau, qui doit être conforme à la topologie réseau.",
    "date_start": {
      "$date": "2024-01-26T00:00:00.000Z"
    },
    "duration": 3,
    "progress": 0,
    "parent": [
      {
        "$oid": "65a146579f2c9370a135da1a"
      }
    ],
    "_id": {
      "$oid": "65a1466e9f2c9370a135da28"
    }
  },
  {
    "task_name": "Installation du logiciel réseau",
    "description": "L’administrateur réseau est responsable de l’installation du système d’exploitation réseau.",
    "date_start": {
      "$date": "2024-01-29T00:00:00.000Z"
    },
    "duration": 2,
    "progress": 0,
    "parent": [
      {
        "$oid": "65a1466e9f2c9370a135da28"
      }
    ],
    "_id": {
      "$oid": "65a146839f2c9370a135da37"
    }
  },
  {
    "task_name": "Configuration du réseau",
    "description": "L’administration réseau gère la configuration du réseau en respectant les étapes certain etapes.",
    "date_start": {
      "$date": "2024-01-31T00:00:00.000Z"
    },
    "duration": 5,
    "progress": 0,
    "parent": [
      {
        "$oid": "65a146839f2c9370a135da37"
      }
    ],
    "_id": {
      "$oid": "65a146979f2c9370a135da47"
    }
  },
  {
    "task_name": "Tâches administratives",
    "description": "L’administrateur réseau doit assurer la gestion de la sécurité. Il gère les contrôles d’accès au réseau, la confidentialité des données qui y transitent, leur intégrité et leur authentification. Il est responsable de l’enregistrement des nouveaux utilisateurs et de la répartition des droits d’accès.",
    "date_start": {
      "$date": "2024-02-05T00:00:00.000Z"
    },
    "duration": 3,
    "progress": 0,
    "parent": [
      {
        "$oid": "65a146979f2c9370a135da47"
      }
    ],
    "_id": {
      "$oid": "65a146b49f2c9370a135da58"
    }
  },
  {
    "task_name": "Test de la connectivité du réseau",
    "description": "Réalisé pour vérifier le bon fonctionnement du réseau en utilisant l'utilitaire ping.",
    "date_start": {
      "$date": "2024-02-08T00:00:00.000Z"
    },
    "duration": 2,
    "progress": 0,
    "parent": [
      {
        "$oid": "65a146979f2c9370a135da47"
      }
    ],
    "_id": {
      "$oid": "65a146c99f2c9370a135da5b"
    }
  }
];