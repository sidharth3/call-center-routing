import java.util.Random;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TextMessageTesting {
	
//	static String myUserName = "##escistd50.003";
//	static String myPassword = "SUTD@Singapore";
	public static String generate() {  //generating random String
		
		
		final String SYMBOLS = " !\"#$%&\\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
		final Random random = new Random();
		int count = random.nextInt(120);
		
		StringBuilder stringBuilder = new StringBuilder();
		for (int i=0;i<count;i++) {
			stringBuilder.append(SYMBOLS.charAt(random.nextInt(SYMBOLS.length())));
		}
		return stringBuilder.toString();
	}
	
	
	public static void main(String[] args) throws InterruptedException {		
		
		runFuzzer();
		
		
	}
	
	public static void runFuzzer() throws InterruptedException{
		System.setProperty("webdriver.chrome.driver","C:\\Users\\akmal\\Downloads\\chromedriver_win32\\chromedriver.exe"); //change path
		//
		WebDriver driver = new ChromeDriver();
	
		driver.get("http://localhost:3000/");
		
	
		WebElement chatButton = driver.findElement(By.id("support_image"));
		
		Thread.sleep(3000);
		
		chatButton.click();
		
		WebElement yesButton = driver.findElement(By.className("botui-actions-buttons-button"));
		
		yesButton.click();
		
		Thread.sleep(3000);
		
		WebElement uPhoneButton = driver.findElement(By.className("botui-actions-buttons-button"));
		
		uPhoneButton.click();
		
		Thread.sleep(15000); //loading textBox takes 12 seconds
		WebElement textBox = driver.findElement(By.className("botui-actions-text-input"));
		
		Thread.sleep(3000);
		
		boolean staleElementLoaded = true;
		
		for(int i = 0; i<50;i++) {
			try {
				Thread.sleep(1000);
				textBox.sendKeys(generate());
				textBox.sendKeys(Keys.ENTER);
				textBox = driver.findElement(By.className("botui-actions-text-input"));
				
			} catch (StaleElementReferenceException e){
				staleElementLoaded = true;
			}
			
		}
		
		
		
		

		// locate the "Next" button in the account page
//		WebElement password = driver.findElement(By.id("password"));	
		
		//write password
//		password.sendKeys(myPassword);
		
//		Thread.sleep(3000);
				
		// login and :)
//		WebElement nextButton = driver.findElement(By.className("submit"));		
//		nextButton.click();
//		
//		Thread.sleep(3000);
//		
//		//click project name
//		WebElement project = driver.findElement(By.id("project-name-p12207705"));		
//		project.click();
	}
	
}
