# US 240

## 1. Context

*This user story is being made for the first time*

## 2. Requirements

US280 - Editar elevador em edifício.*

## 3. Analysis

Para atender ao requisito da US280 de editar um elevador em um edifício, realizamos a seguinte análise:

- Identificamos a necessidade de permitir aos usuários através do "domainId" a capacidade de editar informações de um elevador existente, como o "buildingName," e os andares associados ao elevador.

- Estudamos os requisitos do usuário para garantir que o processo de edição do elevador é eficaz e segura.

- Analisamos como é que a edição afeta as validações existentes, como a verificação de existência do edifício, do elevador com o mesmo nome do edifício e dos andares associados a outros elevadores.

## 4. Design

Para implementar a funcionalidade de edição de elevador, adotamos o seguinte design:

### 4.1. Realization

- Criamos um formulário de edição que permite ao usuário modificar o "buildingName" e os andares associados ao elevador.

- Implementamos a validação necessária para garantir que as edições não violem as restrições existentes, como a verificação de existência do edifício, do elevador com o mesmo nome do edifício e dos andares associados a outros elevadores.

- Desenvolvemos testes de unidade abrangentes para validar a funcionalidade de edição do elevador, incluindo casos de teste para cenários válidos e inválidos.

### 4.2. Sequence Diagram

![Sequence Diagram](EditarElevadorSD.svg "A Sequence Diagram")

### 4.3. Class Diagram

![a class diagram](EditarElevadorCD.svg "A Class Diagram")

### 4.4. Tests

**Test 1:** *Verifies that it is not possible to create an instance of the Example class with null values.*

```
@Test(expected = IllegalArgumentException.class)
public void ensureNullIsNotAllowed() {
	Example instance = new Example(null, null);
}
````

## 5. Implementation

*In this section the team should present, if necessary, some evidencies that the implementation is according to the design. It should also describe and explain other important artifacts necessary to fully understand the implementation like, for instance, configuration files.*

*It is also a best practice to include a listing (with a brief summary) of the major commits regarding this requirement.*

## 6. Integration/Demonstration

*In this section the team should describe the efforts realized in order to integrate this functionality with the other parts/components of the system*

*It is also important to explain any scripts or instructions required to execute an demonstrate this functionality*

## 7. Observations

*This section should be used to include any content that does not fit any of the previous sections.*

*The team should present here, for instance, a critical prespective on the developed work including the analysis of alternative solutioons or related works*

*The team should include in this section statements/references regarding third party works that were used in the development this work.*