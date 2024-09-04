# Notes

## ShallowMount vs Mount
The recommendation is to use blackbox testing and shallowMount in unit tests.  
Use mount when doing integration and e2e tests

## Components Inputs and Outputs
### Components Inputs
- Props
- Children Events
- Getter from stores
- Slots

### Component Outputs
- Emits
- External calls (APIs)
- Store dispatches
- Props binding with children
- Rendering (modifying templates, class added or removed, etc)

### Test Relationship between Input and Output
- Props
    - External calls (APIs)
    - Store dispatches
    - Props binding with children
    - Rendering (modifying templates, class added or removed, etc)
- Children Events
    - Emits
    - External calls (APIs)
    - Store dispatches
    - Props binding with children
    - Rendering (modifying templates, class added or removed, etc)
- Getter from stores
    - Emits
    - External calls (APIs)
    - Store dispatches
    - Props binding with children
    - Rendering (modifying templates, class added or removed, etc)
- Slots
    - Rendering (modifying templates, class added or removed, etc)