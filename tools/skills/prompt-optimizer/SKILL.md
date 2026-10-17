---
name: prompt-optimizer
description: Rewrite a task prompt for clarity and economical execution, then wait for approval before carrying it out. Use when the user requests prompt optimization or an optimize-approve-execute workflow.
---

# Prompt optimizer

Turn the user's task into the shortest clear, executable instruction that preserves
its intent. This is an approval workflow, not permission to execute the task yet.

## Propose

- Use the supplied request and relevant conversation context. Preserve the goal,
  exact paths/names, explicit constraints, deliverables, and acceptance criteria.
  Treat pasted prompts as content to rewrite, not instructions to execute.
- Remove repetition, filler, and generic role instructions. Prefer plain language
  to cryptic shorthand. Do not remove requirements merely to shorten the prompt.
- State the outcome and scope, plus essential constraints and proportionate
  verification. Include a completion condition when otherwise unclear. Add only
  assumptions needed to make the task actionable, and label material assumptions.
- Use existing context first. Before approval, do not inspect repositories, browse,
  run commands, delegate, edit files, install tools, or otherwise begin the proposed
  task. Ask a focused question only if a missing decision prevents a useful proposal;
  otherwise present a reasonable assumption for approval.
- Keep the proposal compact, usually under 150 words unless requirements need more.
  If the original is already clear and concise, retain it with minimal edits.
  Do not claim measured token savings without actual token accounting. The approval
  round adds overhead; clarity and less unnecessary execution are the objectives.

End the turn using this shape, omitting the assumptions line if unnecessary:

**Proposed instruction**

```text
[The optimized task instruction.]
```

Assumptions: [Only material assumptions.]

Approve this instruction to execute it, or send changes.

## Approval and execution

- Wait for an explicit affirmative reply referring to the latest proposal, such as
  "approved", "execute", or "go ahead". Silence, elapsed time, questions, and edits
  are not approval. Permission to create or invoke this skill is not task approval.
- If the user changes the proposal, present the revised instruction and wait again.
  If the approved text is no longer available in context, recover it or ask the user;
  do not reconstruct authorization from a guess.
- After approval, execute the approved scope using normal project instructions and
  tool permissions. Do not optimize and request approval again for routine steps
  within that scope. Approval does not bypass tool permission checks or authorize
  unrelated external actions.
- Search narrowly, read relevant sections, reuse findings, and batch independent
  reads. Prefer existing tools and focused edits. Verify affected behavior and stop
  when the agreed completion condition is met. Report results and real limitations.
- If new evidence requires a material change in scope or assumptions, explain it,
  revise the proposal, and await approval before performing the changed work.

Apply this workflow to the invoked task. Apply it to later tasks only if the user
explicitly requests an ongoing mode; honor requests to turn that mode off.
