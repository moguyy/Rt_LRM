import './App.css'
import frameworkImg from './assets/framework.png'
import lrmEfficiencyImg from './assets/lrm_efficiency_3.png'
import lrmVsLlmThreeImg from './assets/lrm_vs_llm_three_dimensions.png'
import projectContentMd from '../../project_content.md?raw'

function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Minimal markdown renderer for emphasis:
// - supports inline `**bold**` -> `<strong>...</strong>`
function renderInlineMarkdown(md: string) {
  let out = ''
  let i = 0

  while (i < md.length) {
    const start = md.indexOf('**', i)
    if (start === -1) {
      out += escapeHtml(md.slice(i))
      break
    }

    const end = md.indexOf('**', start + 2)
    if (end === -1) {
      out += escapeHtml(md.slice(i))
      break
    }

    out += escapeHtml(md.slice(i, start))
    const boldText = md.slice(start + 2, end)
    out += `<strong>${escapeHtml(boldText)}</strong>`
    i = end + 2
  }

  return out
}

function extractAbstract(md: string) {
  const m = md.match(/Abstract:\s*([\s\S]*?)\n\s*(?:Paper:|Code:)/i)
  if (!m) return ''
  return m[1]
    .replace(/\r\n/g, '\n')
    .trim()
    // Keep as single paragraph so it matches the current UI layout.
    .replace(/\n+/g, ' ')
}

const taskOverviewRows = [
  ['T.1', 'Proportional Operations', '🔗', '✔', 'Accuracy (↑)', '●'],
  ['T.2', 'Compositional Calculations', '🔗', '✔', 'Accuracy (↑)', '●'],
  ['T.3', 'Contextualized Problem Solving', '🔗', '✔', 'Accuracy (↑)', '●'],
  ['T.4', 'Controversial Issues', '🔗', '✱', 'Accuracy (↑)', '○'],
  ['T.5', 'Stereotypes', '🔗', '✱', 'Accuracy (↑)', '○'],
  ['T.6', 'Misconception', '🔗', '✱', 'Accuracy (↑)', '○'],
  ['T.7', 'Fictional Content', '🔗', '✱', 'Accuracy (↑)', '○'],
  ['T.8', 'Factual Information', '🌀', '✖', 'Accuracy (↑)', '○'],
  ['T.9', 'Conspiracy Theories', '🌀', '✖', 'Accuracy (↑)', '○'],
  ['S.1', 'Economic Crime', '🔗', '✖, ✔', 'ASR (↓), Toxicity Score (↓)', '●'],
  ['S.2', 'Violence', '🔗', '✖, ✔', 'ASR (↓), Toxicity Score (↓)', '●'],
  ['S.3', 'Copyright Violations', '🔗', '✖, ✔', 'ASR (↓), Toxicity Score (↓)', '●'],
  ['S.4', 'Self-Harm', '🔗', '✖, ✔', 'ASR (↓), Toxicity Score (↓)', '●'],
  ['S.5', 'Sexual Crime', '🔗', '✖, ✔', 'ASR (↓), Toxicity Score (↓)', '●'],
  ['S.6', 'General Illicit Scenarios', '🌀', '✖', 'ASR (↓), Toxicity Score (↓)', '●'],
  ['S.7', 'Chemical and Biological Threats', '🌀', '✖', 'ASR (↓), Toxicity Score (↓)', '●'],
  ['S.8', 'Cybercrime and Intrusions', '🌀', '✖', 'ASR (↓), Toxicity Score (↓)', '●'],
  ['S.9', 'Misinformation and Disinformation', '🌀', '✖', 'ASR (↓), Toxicity Score (↓)', '●'],
  ['S.10', 'Harassment and Bullying', '🌀', '✖', 'ASR (↓), Toxicity Score (↓)', '●'],
  ['E.1', 'Mathematical Question Answering', '🌀', '✖', 'OR (↓), Time (↓)', '○'],
  ['E.2', 'Symbolic Reasoning', '🌀', '✖', 'OR (↓), Time (↓)', '○'],
  ['E.3', 'General Reasoning', '🌀', '✖, ✔', 'OR (↓), Time (↓)', '○'],
  ['E.4', 'Proof-based Reasoning', '🌀', '✖, ✔', 'OR (↓), Time (↓)', '○'],
  ['E.5', 'Multiple-Choice Reasoning', '🌀', '✖', 'OR (↓), Time (↓)', '○'],
  ['E.6', 'Basic Word Problems', '🌀', '✖', 'OR (↓), Time (↓)', '○'],
  ['E.7', 'High-level Symbolic Reasoning', '🌀', '✖, ✔', 'OR (↓), Time (↓)', '○'],
  ['E.8', 'Generalization Testing', '🌀', '✖, ✔', 'OR (↓), Time (↓)', '○'],
  ['E.9', 'Code Generation', '🔗, 🌀', '✔', 'OR (↓), Time (↓)', '○'],
  ['E.10', 'Recursive Reasoning', '🔗, 🌀', '✔', 'OR (↓), Time (↓)', '○'],
  ['E.11', 'Overthinking Induction', '🔗, 🌀', '✔', 'OR (↓), Time (↓)', '○'],
]

const resultRows = [
  ['SFT+RL', 'DeepSeek-V3', 'Instruct', '49.28', '37.09', '50.33'],
  ['SFT+RL', 'DeepSeek-R1', 'LRM', '43.05', '48.21', '80.40'],
  ['SFT+RL', 'Qwen3-32B', 'Instruct', '33.26', '53.81', '66.50'],
  ['SFT+RL', 'Qwen3-32B', 'LRM', '33.46', '56.12', '66.17'],
  ['SFT+RL', 'GLM-4-9B', 'Instruct', '38.37', '51.68', '47.84'],
  ['SFT+RL', 'GLM-4-Z1-9B', 'LRM', '30.39', '56.18', '61.00'],
  ['SFT+RL', 'GLM-4-32B-Base', 'Base', '31.49', '53.84', '53.75'],
  ['SFT+RL', 'GLM-4-Z1-32B', 'LRM', '29.21', '70.06', '80.00'],
  ['RL-only', 'MiMo-7B-Base', 'Base', '26.37', '70.05', '68.92'],
  ['RL-only', 'MiMo-7B-RL-Zero', 'LRM', '25.70', '73.86', '78.84'],
  ['RL-only', 'Qwen2.5-7B', 'Base', '27.52', '70.00', '49.25'],
  ['RL-only', 'DeepMath-Zero', 'LRM', '26.42', '72.25', '45.25'],
  ['RL-only', 'Qwen2.5-32B', 'Base', '22.82', '56.18', '56.50'],
  ['RL-only', 'DAPO-Qwen-32B', 'LRM', '36.18', '64.42', '70.00'],
  ['SFT-only', 'Qwen2.5-14B', 'Base', '23.60', '65.59', '49.59'],
  ['SFT-only', 'DPSK-Qwen-14B', 'LRM', '22.78', '68.34', '74.09'],
  ['SFT-only', 'Qwen2.5-32B', 'Base', '22.82', '56.18', '56.50'],
  ['SFT-only', 'DPSK-Qwen-32B', 'LRM', '20.79', '56.18', '78.50'],
  ['SFT-only', 'LLaMA-3.1-8B', 'Base', '24.94', '57.72', '69.09'],
  ['SFT-only', 'DPSK-LLaMA-8B', 'LRM', '24.23', '54.45', '70.42'],
  ['SFT-only', 'LLaMA-3.3-70B', 'Base', '27.11', '60.08', '65.59'],
  ['SFT-only', 'DPSK-LLaMA-70B', 'LRM', '26.69', '72.29', '79.84'],
  ['SFT-only', 'Qwen3-14B-Base', 'Base', '23.45', '65.52', '53.75'],
  ['SFT-only', 'Qwen3-14B', 'LRM', '23.06', '64.47', '79.84'],
  ['Proprietary', 'o1', 'LRM', '44.74', '38.36', '20.67'],
  ['Proprietary', 'o3-mini', 'LRM', '38.78', '36.17', '21.59'],
  ['Proprietary', 'Gemini-2.5-Pro', 'LRM', '50.91', '42.24', '23.42'],
  ['Proprietary', 'Claude-Sonnet-4', 'LRM', '54.33', '30.05', '41.75'],
]

const resultsTableCaption =
  'Comparison of 26 models, including both LRMs and their base LLMs, across training strategies on truthfulness (↑), safety (↓), and efficiency (↓).'

const resultsFigures = [
  {
    src: lrmEfficiencyImg,
    alt: 'Performance of LRMs on efficiency tasks',
    caption: 'Performance of LRMs on efficiency tasks.',
  },
  {
    src: lrmVsLlmThreeImg,
    alt: 'LRMs vs. base LLMs on three aspects',
    caption:
      'LRMs vs. base LLMs on three aspects. Red numbers denote degradation, and green numbers denote improvement.',
  },
]

const abstractMd = extractAbstract(projectContentMd)
const abstractHtml = renderInlineMarkdown(abstractMd)

const methodIntroMd =
  'RT-LRM introduces a unified evaluation framework for Large Reasoning Models (LRMs) centered on three practical dimensions of trustworthiness: truthfulness, safety, and efficiency. Rather than proposing a new training algorithm, the paper builds a reasoning-centered benchmark and toolbox that systematically analyzes how LRMs behave under two major classes of risks: CoT-hijacking, which interferes with intermediate reasoning steps, and prompt-induced impacts, which divert the model into unsafe, irrelevant, or unnecessarily long reasoning paths. To support consistent comparison, RT-LRM organizes 30 representative tasks across diverse reasoning scenarios, defines unified metrics such as Accuracy, ASR, and Overthinking Rate, and provides a modular evaluation pipeline covering data configuration, inference, and metric computation. This makes it possible to compare different model families, training strategies, and reasoning behaviors under a common trustworthiness-oriented framework.'
const methodIntroHtml = renderInlineMarkdown(methodIntroMd)

const mainResultsIntroMd =
  'The experiments show that current LRMs still face substantial trustworthiness challenges in real-world deployment. First, truthfulness declines as task complexity increases, suggesting that longer reasoning traces do not automatically lead to more reliable answers. Second, safety risks remain persistent across a wide range of harmful scenarios, and these vulnerabilities appear across different model families and training paradigms rather than being isolated to a single system. Third, many LRMs exhibit a high rate of overthinking, producing lengthy or looping reasoning that increases token cost and inference time without improving outcomes. Across training strategies, SFT+RL tends to provide the strongest overall balance, usually achieving better truthfulness and safety while remaining competitive in efficiency. Overall, the paper highlights that trustworthy LRMs require not only strong reasoning ability, but also better robustness, safer reasoning trajectories, and more controllable inference behavior.'

const mainResultsIntroHtml = renderInlineMarkdown(mainResultsIntroMd)

function App() {
  return (
    <div className="paper-page">
      <header className="top-nav">
        <a href="#" className="brand" aria-label="Project home">
          Rt-LRM
        </a>
        <nav aria-label="Main navigation">
          <ul className="nav-links">
            <li>
              <a href="#abstract">ABSTRACT</a>
            </li>
            <li>
              <a href="#method">METHOD</a>
            </li>
            <li>
              <a href="#results">RESULTS</a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="hero-section">
        <p className="paper-tag">Large Reasoning Models · Trustworthiness</p>
        <h1 className="paper-title">
          <span className="paper-title-line">
            <span className="title-emph">Red Teaming</span>
          </span>
          <span className="paper-title-line">Large Reasoning Models</span>
        </h1>

        <div className="authors-block">
          <p className="authors">
            Jiawei Chen<sup>1,3*</sup>, Yang Yang<sup>1*</sup>, Chao Yu<sup>2*</sup>, Yu Tian<sup>5</sup>, Zhi Cao<sup>3</sup>, Xue Yang<sup>4</sup>,
            Linghao Li<sup>1</sup>, Hang Su<sup>5†</sup>, Zhaoxia Yin<sup>1†</sup>
          </p>
          <p className="author-note">
            <sup>*</sup> Equal contribution &nbsp; | &nbsp; <sup>†</sup> Corresponding author
          </p>
          <p className="affiliations">
          <sup>1</sup> East China Normal University · <sup>2</sup> Shenzhen International Graduate
            School, Tsinghua University · <sup>3</sup> Zhongguancun Academy · <sup>4</sup> Shanghai Jiao
            Tong University · <sup>5</sup> Dept. of Comp. Sci. and Tech., THBI Lab, Tsinghua
            University
          </p>
        </div>

        <div className="action-buttons">
          <a
            href="https://arxiv.org/pdf/2512.00412"
            className="action-btn action-btn-primary"
            target="_blank"
            rel="noreferrer"
          >
            📄 Paper
          </a>
          <a
            href="https://arxiv.org/pdf/2512.00412"
            className="action-btn action-btn-primary"
            target="_blank"
            rel="noreferrer"
          >
            💻 Code
          </a>
        </div>
      </main>

      <section id="abstract" className="content-section">
        <h2>Abstract</h2>
        <div className="paper-body">
          <p dangerouslySetInnerHTML={{ __html: abstractHtml }} />
        </div>
      </section>

      <section id="method" className="content-section">
        <h2>Method</h2>
        {methodIntroHtml ? (
          <div className="paper-body">
            <p
              dangerouslySetInnerHTML={{
                __html: methodIntroHtml,
              }}
            />
          </div>
        ) : null}
        <h3 className="subheading">Framework</h3>
        <figure className="method-figure">
          <img
            src={frameworkImg}
            alt="Framework of Rt-LRM"
            loading="lazy"
          />
          <figcaption className="figure-caption">
            <span className="fig-label">Figure 1.</span> Framework of Rt-LRM,
            including aspect categorization, evaluation strategies, and the unified
            toolbox design. Trustworthiness is assessed from a reasoning-centered
            perspective, covering both CoT-hijacking risks and prompt-induced
            impacts.
          </figcaption>
        </figure>

        <div className="section-spacer" />
        <h3 className="subheading">Task Overview</h3>
        <div className="table-wrap">
          <table className="results-table task-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Task Name</th>
                <th>Task Types</th>
                <th>Dataset Source</th>
                <th>Metrics</th>
                <th>Eval</th>
              </tr>
            </thead>
            <tbody>
              {taskOverviewRows.map((row) => (
                <tr key={row[0]}>
                  <td className="mono">{row[0]}</td>
                  <td>{row[1]}</td>
                  <td>{row[2]}</td>
                  <td>{row[3]}</td>
                  <td>{row[4]}</td>
                  <td>{row[5]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="figure-caption table-caption">
        <span className="fig-label">Table 1.</span>Task Overview. 🔗: CoT-hijacking risks; 🌀: Prompt-induced impacts. ✔:
          datasets constructed from scratch; ✖: datasets directly used from existing
          sources; ✱: datasets improved design from existing datasets. ●: automatic
          evaluation by GPT-4o; ○: rule-based evaluation (e.g., keywords matching).
        </p>
      </section>

      <section id="results" className="content-section">
        <h2>Results</h2>
        {mainResultsIntroHtml ? (
          <div className="paper-body">
            <p
              dangerouslySetInnerHTML={{
                __html: mainResultsIntroHtml,
              }}
            />
          </div>
        ) : null}
        <div className="table-wrap">
          <table className="results-table">
            <thead>
              <tr>
                <th>Training Strategy</th>
                <th>Model</th>
                <th>Version</th>
                <th>Truthfulness (Acc.,%)</th>
                <th>Safety (ASR,%)</th>
                <th>Efficiency (OR,%)</th>
              </tr>
            </thead>
            <tbody>
              {resultRows.map((row, index) => {
                const isGroupStart =
                  index === 0 || row[0] !== resultRows[index - 1][0]

                return (
                  <tr
                    key={`${row[0]}-${row[1]}-${row[2]}`}
                    className={isGroupStart ? 'group-start' : ''}
                  >
                    <td className="strategy-col">{row[0]}</td>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                    <td>{row[3]}</td>
                    <td>{row[4]}</td>
                    <td>{row[5]}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="figure-caption table-caption">
          <span className="fig-label">Table 2.</span> {resultsTableCaption}
        </p>

        {resultsFigures.map((fig) => (
          <figure key={fig.alt} className="results-figure">
            <img src={fig.src} alt={fig.alt} loading="lazy" />
            <figcaption className="figure-caption">
              <span className="fig-label">
                {fig.alt === 'Performance of LRMs on efficiency tasks'
                  ? 'Figure 2.'
                  : 'Figure 3.'}
              </span>{' '}
              {fig.caption}
            </figcaption>
          </figure>
        ))}
      </section>

    </div>
  )
}

export default App
