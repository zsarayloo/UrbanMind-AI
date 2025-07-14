# 🧠 UrbanMind-AI

This research project explores the use of Large Language Models (LLMs) reasoning methods like Chain-of-Thought (CoT), Tree-of-Thought (ToT), and HyperTree to evaluate high school site selection in urban regions.

Project: Urban School Site Selection using LLM Reasoning
Author: Zahra Sarayloo (University of Waterloo)
Goal: Compare CoT, ToT, HyperTree for high school placement in Waterloo Region

# Directory structure
UrbanMind-AI/
 │
 ├── 📁 .github/workflows/              # CI/CD workflows for automated testing/deployment
 ├── 📁 configs/                         # YAML or JSON configuration files for pipelines, models, experiments
 ├── 📁 data/                            # All data inputs/outputs (GITIGNORED)
 │   ├── raw/                           # Unprocessed data (GeoJSONs, CSVs)
 │   ├── processed/                     # Cleaned, LLM-ready JSON/GeoJSON
 │   └── waterloo_knowledge_base.json  # Unified dataset for LLM input
 │
 ├── 📁 docs/                            # Project documentation, diagrams, papers
 ├── 📁 notebooks/                       # Jupyter notebooks for analysis and visualization
 │   └── exploratory_eda.ipynb
 ├── 📁 results/                         # LLM outputs, evaluation results, plots (GITIGNORED)
 ├── 📁 src/                             # Main pipeline logic
 │   ├── data_collection/               # Web scraping & API ingestion
 │   │   └── data_collection.py
 │   ├── llm_reasoning/                 # Reasoning framework implementations
 │   │   ├── llm_reasoning_framework.py
 │   │   └── llm_controller_base.py
 │   ├── evaluation/                    # Evaluation and metrics
 │   │   └── evaluation_framework.py
 │   ├── analysis/                      # Statistical analysis and plots
 │   ├── utils/                         # Utility functions, constants, file handling
 │   ├── main.py                        # Main execution script
 │   └── testing_strategy.py            # Unit/integration testing routines
 │
 ├── 📁 llm_controllers/                # Submodules for each strategy (can be moved to src if preferred)
 │   ├── chain_of_thought.py
 │   ├── tree_of_thought.py
 │   ├── hypertree.py
 │
 ├── 📁 prompts/                        # LLM prompt templates
 │   └── master_prompt.txt
 ├── 📁 frontend/                       # Vercel-based UI to visualize reasoning & results
 │   └── [React/Vite/Next.js app here]
 │
 ├── .env.example                       # Sample API keys for local use
 ├── requirements.txt                   # Pip requirements
 ├── environment.yml                    # Conda environment definition
 ├── github_setup.sh                    # Git + environment bootstrap script
 ├── project_setup_guide.md             # Setup & usage instructions
 ├── README.md                          # Project documentation
 └── main.py                            # Unified experiment runner
