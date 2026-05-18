# Debugging Strategies

> Adapted from [debugging-strategies](https://github.com/sickn33/antigravity-awesome-skills/tree/main/skills/debugging-strategies) (MIT License)

Systematic debugging approach — debug methodically, not randomly.

## When to Use

- Investigating bugs or unexpected behavior
- Diagnosing performance issues
- Tracing data flow problems
- Fixing failing tests

## The Debugging Process

### 1. Reproduce the Bug

Before fixing anything:
- Write a failing test that reproduces the issue
- Identify the exact steps to reproduce
- Determine if it's consistent or intermittent
- Note the environment (browser, Node version, OS)

### 2. Isolate the Problem

- **Binary search**: Comment out half the code, narrow down
- **Trace data flow**: Follow data from input to output
- **Check boundaries**: Validate inputs, outputs, and state transitions
- **Compare**: What changed recently? Check git diff

### 3. Form a Hypothesis

- Based on evidence, not guessing
- State it explicitly: "I think X causes Y because Z"
- Design an experiment to prove/disprove it

### 4. Test the Hypothesis

- Make one change at a time
- Verify with a test, not manual checking
- If wrong, return to step 2 with new information

### 5. Fix and Verify

- Write a test that fails without the fix
- Apply the minimal fix
- Verify the test passes
- Run the full test suite
- Consider if similar bugs exist elsewhere

## React-Specific Debugging

### Component Not Rendering
1. Check props are being passed correctly
2. Check conditional rendering logic
3. Verify key props on lists
4. Check for silent errors in effects

### State Not Updating
1. Verify `setState` is called (not mutating directly)
2. Check for stale closures in event handlers
3. Verify effect dependencies are correct
4. Check if state update is batched

### Performance Issues
1. Use React DevTools Profiler
2. Check for unnecessary re-renders
3. Look for missing `useMemo`/`useCallback`
4. Check for large component trees without `React.memo`
5. Verify lazy loading is working

### API Integration Issues
1. Check network tab for request/response
2. Verify CORS headers
3. Check for race conditions (stale data)
4. Verify error handling paths
5. Check AbortController cleanup

## Debugging Tools

| Tool | Use Case |
|---|---|
| Browser DevTools | DOM, network, console, performance |
| React DevTools | Component tree, props, state, profiler |
| Vitest | Unit/integration test debugging |
| `console.log` | Quick data inspection (remove before commit) |
| `debugger` | Breakpoint debugging in browser |
| Network tab | API request/response inspection |

## Anti-Patterns

❌ Random changes hoping something works  
❌ Fixing symptoms instead of root cause  
❌ Removing error handling to make errors go away  
❌ "It works on my machine" without investigation  
❌ Fixing without a test to prevent regression  
❌ Leaving `console.log` statements in code  

## When Stuck

| Problem | Solution |
|---|---|
| Can't reproduce | Get exact environment, inputs, and steps |
| Too many possibilities | Binary search to narrow scope |
| Intermittent bug | Look for race conditions, timing issues |
| Works in tests, fails in browser | Check for environment differences |
| No idea where to start | Trace data flow from input to output |

## Limitations

- This skill provides debugging methodology, not specific solutions.
- Complex issues may require pair debugging or fresh eyes.
- Always write a test to prevent regression before fixing.
