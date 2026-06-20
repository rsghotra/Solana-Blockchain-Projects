const anchor = require("@coral-xyz/anchor");

const {SystemProgram} = anchor.web3;

describe("counter-project", () => {
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);

    const program = anchor.workspace.CounterProject;

    it("Initializes the counter", async() => {
        const counter = anchor.web3.Keypair.generate();
        await program.rpc.initialize({
            accounts: {
                counter: counter.publicKey,
                user: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
            },
            signers: [counter],
        });

        const counterAccount = await program.account.counter.fetch(counter.publicKey);
        console.log("Counter value: ", counterAccount.count.toNumber());
    });

    it("Increments the counter", async() => {
        const counter = anchor.web3.Keypair.generate();
        await program.rpc.initialize({
            accounts: {
                counter: counter.publicKey,
                user: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId,
            },
            signers: [counter],
        });

        await program.rpc.increment({
            accounts: {
                counter: counter.publicKey,
                user: provider.wallet.publicKey,
            },
        });
        const counterAccount = await program.account.counter.fetch(counter.publicKey);
        console.log("Counter value after increment:", counterAccount.count.toNumber());
    });
});