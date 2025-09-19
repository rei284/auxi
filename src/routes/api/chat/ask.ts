import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod/v4'

const root: FastifyPluginAsyncZod = async (fastify, opts): Promise<void> => {
  fastify.post('/ask', { schema: {
    body: z.object({
      question: z.string()
    })
  } }, async (request, reply) => {
    const { question } = request.body
    switch (question.toLowerCase()) {
      case "Define VSEPR theory".toLowerCase():
        return reply.send(`Sure! Here's a simple and clear definition of <b>VSEPR theory</b>:

<hr>

<h3><b>VSEPR Theory (Valence Shell Electron Pair Repulsion Theory)</b></h3>

<b>Definition:</b>

VSEPR theory is used to predict the <b>shape</b> or <b>geometry</b> of molecules. It is based on the idea that:

<b>Electron pairs around the central atom of a molecule repel each other and try to stay as far apart as possible.</b>

This repulsion between electron pairs (bonded or lone pairs) decides the <b>arrangement of atoms</b> in space, which gives the molecule its <b>shape</b>.

<hr>

<h3> <b>Key Points:<b> </b>

* Focuses on <b>valence shell</b> electron pairs (outermost shell).
* Both <b>bonding pairs</b> (shared electrons in bonds) and <b>lone pairs</b> (non-bonded electrons) are considered.
* <b>Lone pairs repel more strongly</b> than bonding pairs.
* Common shapes predicted include:

  * <b>Linear</b> (e.g., CO₂)
  * <b>Trigonal planar</b> (e.g., BF₃)
  * <b>Tetrahedral</b> (e.g., CH₄)
  * <b>Trigonal bipyramidal</b> (e.g., PCl₅)
  * <b>Octahedral</b> (e.g., SF₆)

<hr>

<h3><b>Example:</b></h3>

In <b>CH₄ (methane)</b>:

* The central atom (carbon) has 4 bonding pairs and no lone pairs.
* According to VSEPR theory, these pairs arrange themselves in a <b>tetrahedral</b> shape to stay as far apart as possible.`)
      case "Write a python program to check if a string is a palindrome".toLowerCase():
        return reply.send(`\`\`\`py
def is_palindrome(s: str) -> bool:
  # Remove spaces and convert to lowercase for uniformity
  cleaned = ''.join(ch.lower() for ch in s if ch.isalnum())
  return cleaned == cleaned[::-1]
\`\`\`

# Example usage
\`\`\`py
word = input("Enter a string: ")
if is_palindrome(word):
    print("It is a palindrome.")
else:
    print("It is not a palindrome.")
\`\`\`
`)
      case "Summarize all of Macbeth".toLowerCase():
        return reply.send(`# Macbeth - Summary

**Author:** William Shakespeare  
**Genre:** Tragedy

---

**Brief Summary:**

*Macbeth* is a tragedy about ambition, power, and guilt. The play is set in Scotland and follows the rise and fall of **Macbeth**, a brave Scottish general.

1. **The Witches’ Prophecy:**  
   Three witches meet Macbeth and Banquo on a Scottish heath. They prophesy that Macbeth will become **Thane of Cawdor** and eventually **King of Scotland**, while Banquo's descendants will inherit the throne.

2. **Macbeth Becomes Thane of Cawdor:**  
   King Duncan rewards Macbeth with the title Thane of Cawdor, fulfilling part of the prophecy. This sparks Macbeth’s ambition for the throne.

3. **Lady Macbeth’s Influence:**  
   Lady Macbeth persuades Macbeth to murder King Duncan to seize the throne. Despite his hesitation, Macbeth kills Duncan in his sleep.

4. **Macbeth Becomes King:**  
   Duncan’s sons, Malcolm and Donalbain, flee, fearing for their lives. Macbeth is crowned king but becomes paranoid about losing power.

5. **Macbeth’s Tyranny:**  
   To secure his throne, Macbeth murders Banquo and attempts to kill Banquo’s son, Fleance, but Fleance escapes. Macbeth visits the witches again for guidance.

6. **The Witches’ Second Prophecy:**  
   The witches give Macbeth three apparitions:
   - Beware Macduff.  
   - No man born of a woman shall harm Macbeth.  
   - He will be safe until Birnam Wood comes to Dunsinane Hill.

7. **Macbeth’s Downfall Begins:**  
   Macbeth kills Macduff’s family. Macduff joins Malcolm and the English army to overthrow Macbeth.

8. **The Final Battle:**  
   Malcolm’s army disguises itself with branches from Birnam Wood, fulfilling the prophecy. In battle, Macduff reveals he was **born by Caesarean section**, not “of a woman” in the usual way, and kills Macbeth.

9. **Restoration of Order:**  
   Malcolm becomes king, restoring peace and order to Scotland.

---

**Themes:**  
- Ambition and its destructive effects  
- Guilt and conscience  
- Fate vs. free will  
- The corrupting influence of power  

**Conclusion:**  
*Macbeth* is a cautionary tale showing how unchecked ambition and moral weakness can lead to ruin.
`)
      case "What part of the brain is responsible for maintaining balance".toLowerCase():
        return reply.send(`The part of the brain responsible for maintaining **balance** is the **cerebellum**. 

- The **cerebellum** is located at the back of the brain, under the **cerebrum**.  
- It helps in **coordinating muscles**, **posture**, and **body movements**.  
- It also ensures that the body stays **steady and balanced** while standing, walking, or performing any activity.  

So, whenever you balance on one foot or ride a bicycle, your **cerebellum** is at work!
`)
    case "Write the binomial expression for (a + b)^6".toLowerCase():
      return reply.send(String.raw`The binomial expansion of \((a + b)^6\) using the factorial formula is:

\[
(a + b)^6 = a^6 + 6a^5b + 15a^4b^2 + 20a^3b^3 + 15a^2b^4 + 6ab^5 + b^6
\]

**Explanation:**

1. Each term is of the form 
\[
\binom{6}{k} a^{6-k} b^k = \frac{6!}{k!(6-k)!} a^{6-k} b^k, \quad k = 0, 1, 2, \dots, 6
\]

2. Here, \(6! = 6 \times 5 \times 4 \times 3 \times 2 \times 1\) is the factorial of 6.

3. The binomial coefficient \(\binom{6}{k}\) tells how many ways we can choose \(k\) \(b\)'s from 6 terms.

4. The power of \(a\) decreases from 6 to 0, while the power of \(b\) increases from 0 to 6.`)
    }
  })
}

export default root