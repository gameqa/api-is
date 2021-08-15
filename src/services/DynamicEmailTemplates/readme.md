# Documentation & Code examples

When using the SendGrid api, there is a considerable chance that you will spend some time debugging due to small careless errors. Asyncronous programming by itself can present debugging challenges. Adding to that, the way that that SendGrid relies on long strings identifying templates as well as the fact that each template needs a different JSON structure just for it, the possibilities to err increase considerably.

This service was created in order to minimize the possibility of developers making these kinds of mistakes. It encapsulates SendGrid with-in a class that fully utilizes TypeScript and generics to make sending easy.

## Creating a new template

To create a new template, you first need to add an object representing the Dynamic Template under `./interface.ts` like so.

```ts
export interface MyNewTemplateExample1 {
    templateId: "d-00000000000000000000000000000001";
    data: {
        foo: string;
    };
}

export interface MyNewTemplateExample2 {
    templateId: "d-00000000000000000000000000000002";
    data: {
        turtles: [
            {name: "foo", age: 100},
            {name: "bar", age: 102}
        ],
    }
}

```

Notice the templateId needs to be the exact string identifying the template. The data field can be any JSON object, With-in sendgrid there is a dynamic dummy data editor. The data object should be of the same form as the dummy data in SendGrid.

## Registering the template

In order to make the template accessible to developers using this service you need to include (register) the template in the `Template` type union.

```ts
export type Template =
    | SendWeeklyWinners
    | SignupTemplateData
    | ResetPasswordTemplateData
    | MyNewTemplateExample1
    | MyNewTemplateExample2;

```

## Make the templateId accessible

Next, you need to `export` the templateId from the `index.ts` file like so

```ts
export const MY_NEW_TEMPLATE_1 = "d-000000000000000000000000000000001";
export const MY_NEW_TEMPLATE_2 = "d-000000000000000000000000000000002";
```

The constants name can be anything, but its best to keep it similar to the template name in SendGrid

## Use case

Here is a realistic example: we want to send the string "123456" which represents a verification code

```ts
await new DynamicEmail.Sender({
    to: ["recipient@company.com"],
    from: DynamicEmail.DEFAULT_SENDER,
    subject: "Staðfestingarkóði Spurningar.is",
}).send({
    templateId: DynamicEmail.REGISTER_USER_TEMPLATE,
    data: { verificationCode: "123456" },
});

```

### Notes

- The DEFAULT_SENDER is exported from this service. It can be anything, but should ideally be the main email registered with SendGrid.

- TypeScripts inference understands exactly what the structure of the data field should be, given the templateId you used.
